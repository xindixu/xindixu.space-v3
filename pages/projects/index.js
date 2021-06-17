import React, { useState, useCallback, useEffect } from "react"
import { Box, Card, CardFooter, Grid, Main, Spinner, Text } from "grommet"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import PropTypes from "prop-types"
import { motion } from "framer-motion"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import { uniqBy } from "lodash"
import Filters from "components/filters"
import { getQuery } from "components/filters/utils"
import { getAllProjects } from "lib/content/project"
import styleSettings from "lib/style-settings"
import useMedia from "hooks/use-media"

const {
  elevation: { light },
  readable,
} = styleSettings

const ActiveCard = styled(Card)`
  :hover {
    box-shadow: ${light.medium};
  }
`

const ReadableContent = styled(Box)`
  width: 100%;
  max-width ${readable};  
`

const cardAnimation = {
  out: ({ index }) => ({
    translateY: -16,
    opacity: 0,
    transition: {
      delay: 0.1 * index,
    },
  }),
  in: ({ index }) => ({
    translateY: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.1 * index,
    },
  }),
}

const cardHoverAnimation = {
  translateY: -16,
  transition: {
    duration: 0.2,
  },
}

const Project = ({ name, slug, thumbnail: { src, width, height } }) => (
  <motion.div whileHover={cardHoverAnimation}>
    <Link href={`/projects/${slug}`}>
      <ActiveCard>
        <Box>
          <Image
            // TODO: fallback url
            layout="responsive"
            src={`https:${src}`}
            width={width}
            height={height}
            alt={`devices showing different screenshots of project ${name}`}
          />
        </Box>
        <CardFooter pad={{ horizontal: "medium", vertical: "small" }}>
          <Text>{name}</Text>
        </CardFooter>
      </ActiveCard>
    </Link>
  </motion.div>
)

const getParam = (tags) =>
  Object.values(tags).filter((tag) => !tag.endsWith("all"))

const getTagsFromQuery = (query) =>
  Object.entries(query).reduce((memo, [key, value]) => {
    memo[key] = `${key}-${value}`
    return memo
  }, {})

const Projects = ({
  initialProjects = [],
  initialTotalPages,
  initialTags,
  isXxsUp,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [tags, setTags] = useState(initialTags)

  const isMdUp = useMedia("md")
  const [gridFef, gridInView] = useInView({ delay: 1000 })
  const [loadMoreRef, loadMoreInView] = useInView()

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
        tags: getParam(tags),
        page: 1,
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
        tags: getParam(tags),
        page,
      })

      setIsLoading(false)
      setProjects((prevProjects) =>
        uniqBy([...prevProjects, ...entries], (project) => project.slug)
      )
    }
    request()
  }, [page, tags])

  useEffect(() => {
    if (loadMoreInView) {
      setPage((prevPage) => prevPage + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMoreInView])

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
          <Grid
            gap="medium"
            columns={{
              count: "fill",
              size: isMdUp ? "medium" : "100%",
            }}
            ref={gridFef}
          >
            {projects.map(({ name, slug, devices }, index) => (
              <div key={slug}>
                <motion.div
                  initial={gridInView ? "out" : false}
                  animate={gridInView ? "in" : "out"}
                  variants={cardAnimation}
                  custom={{ index }}
                >
                  <Project name={name} slug={slug} thumbnail={devices} />
                </motion.div>
              </div>
            ))}
            {page < totalPages && !isLoading && <div ref={loadMoreRef} />}
          </Grid>
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
            background="light-1"
          >
            <Text color="dark-2">
              No matching results. How about trying some other filters?
            </Text>
          </Box>
        )}
      </ReadableContent>
    </Main>
  )
}

export async function getServerSideProps(context) {
  const { query } = context

  const tags = getTagsFromQuery(query)

  const { entries, totalPages } = await getAllProjects({ tags: getParam(tags) })
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

Projects.propTypes = {
  initialProjects: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  initialTotalPages: PropTypes.number.isRequired,
  initialTags: PropTypes.object.isRequired,
}

export default Projects
