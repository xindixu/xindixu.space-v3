import React, { useContext, useState, useCallback, useEffect } from "react"
import {
  Box,
  Card,
  CardFooter,
  Grid,
  Main,
  ResponsiveContext,
  Text,
} from "grommet"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import PropTypes from "prop-types"
import { motion } from "framer-motion"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import Filters from "components/filters"
import { getQuery } from "components/filters/utils"
import { getAllProjects } from "lib/content/project"
import styleSettings from "lib/style-settings"

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

const Projects = ({ initialProjects = [], initialTotalPages, initialTags }) => {
  const router = useRouter()

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [tags, setTags] = useState(initialTags)

  const size = useContext(ResponsiveContext)

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
      const response = await getAllProjects({
        tags: getParam(tags),
        page: 1,
      })
      setProjects(response?.entries)
      setTotalPages(response?.totalPages)
    }
    request()
  }, [router, tags])

  const loadMoreProject = useCallback(() => {
    const request = async () => {
      const { entries } = await getAllProjects({
        tags: getParam(tags),
        page,
      })
      setProjects((prevProjects) => [...prevProjects, ...entries])
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
    <Main pad="xlarge" fill={false} justify="center" direction="row">
      <ReadableContent>
        <Box>
          <Filters tags={tags} setTags={setTags} />
        </Box>
        {hasProjects ? (
          <Grid
            gap="medium"
            margin={{ top: "medium" }}
            columns={{
              count: "fill",
              size: size === "small" ? "100%" : "medium",
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
          </Grid>
        ) : (
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
        {page < totalPages && <div ref={loadMoreRef}>load more</div>}
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
