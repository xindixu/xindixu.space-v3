import React, { useState, useCallback, useEffect } from "react"
import { Box, Main, Spinner, Text } from "grommet"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

import PropTypes from "prop-types"
import styled from "styled-components"
import { isEmpty, uniqBy } from "lodash"
import {
  getTagParams,
  getQuery,
  getTags,
  TTagQueries,
  TTags,
} from "lib/content/tag"
import { TParsedProject } from "lib/content/types"
import Filters from "components/filters"
import { getAllProjects } from "lib/content/project"
import styleSettings from "lib/style-settings"
import { TPageProps } from "types/types"
import ProjectGrid from "components/project-grid"

const { readable } = styleSettings

const ReadableContent = styled(Box)`
  width: 100%;
  max-width ${readable};  
`

type TProps = {
  initialProjects: TParsedProject[]
  initialTags: TTags
  initialTotalPages: number
} & TPageProps

const Projects = ({
  initialProjects = [],
  initialTags = {},
  initialTotalPages = 0,
  isXxsUp,
}: TProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [tags, setTags] = useState(initialTags)

  const [projects, setProjects] = useState(initialProjects)

  const filterProjects = useCallback(() => {
    setPage(1)

    router.replace(
      {
        pathname: "/projects",
        query: getQuery(tags),
      },
      undefined,
      {
        scroll: false,
      }
    )

    const request = async () => {
      setIsLoading(true)
      setProjects([])
      const response = await getAllProjects({
        tags: getTagParams(tags),
        page: "1",
      })
      setIsLoading(false)
      setProjects(response?.entries)
      setTotalPages(response?.totalPages)
    }
    request()
  }, [router, tags])

  const loadMoreProject = useCallback(() => {
    const request = async () => {
      setIsLoading(true)
      const { entries } = await getAllProjects({
        tags: getTagParams(tags),
        page: `${page}`,
      })

      setIsLoading(false)
      setProjects((prevProjects) =>
        uniqBy([...prevProjects, ...entries], (project) => project.slug)
      )
    }
    request()
  }, [page, tags])

  useEffect(() => {
    filterProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  useEffect(() => {
    loadMoreProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const hasProjects = projects.length > 0

  return (
    <Main
      pad={{ horizontal: isXxsUp ? "xlarge" : "medium", vertical: "xlarge" }}
      fill={false}
      justify="center"
      direction="row"
    >
      <ReadableContent gap="large">
        <Filters tags={tags} setTags={setTags} />
        {projects.length > 0 && (
          <ProjectGrid
            loadMore={() => setPage((prevPage) => prevPage + 1)}
            projects={projects}
            showLoadMore={page < totalPages && !isLoading}
          />
        )}
        {isLoading && (
          <Box align="center" fill="horizontal">
            <Spinner size="large" />
          </Box>
        )}
        {!isLoading && !hasProjects && (
          <Box
            align="center"
            justify="center"
            pad={{ vertical: "large", horizontal: "large" }}
            background="background-front"
          >
            <Text color="text-weak">
              No matching results. How about trying some other filters?
            </Text>
          </Box>
        )}
      </ReadableContent>
    </Main>
  )
}

const fallbackProps = {
  initialProjects: [],
  initialTotalPages: 0,
  initialTags: {},
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (
    !query ||
    typeof query !== "object" ||
    isEmpty(query) ||
    Object.values(query).some((value) => !value || Array.isArray(value))
  ) {
    return {
      props: fallbackProps,
    }
  }

  const tags = getTags(query as TTagQueries)

  const { entries, totalPages } = await getAllProjects({
    tags: getTagParams(tags),
  })
  // Next.js expects the props to be json stringify-able
  // https://dev.to/ryyppy/reason-records-nextjs-undefined-and-getstaticprops-5d46
  return {
    props: JSON.parse(
      JSON.stringify({
        initialProjects: [...entries],
        initialTotalPages: totalPages,
        initialTags: tags,
      })
    ),
  }
}

Projects.defaultProps = {
  initialProjects: [],
  initialTotalPages: 0,
  initialTags: {},
}

Projects.propTypes = {
  initialProjects: PropTypes.arrayOf(PropTypes.object.isRequired),
  initialTotalPages: PropTypes.number,
  initialTags: PropTypes.object,
}

export default Projects
