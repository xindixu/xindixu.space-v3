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
import Link from "next/link"
import PropTypes from "prop-types"
import { motion } from "framer-motion"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import Filters from "components/filters"
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

const Projects = ({ initialProjects = [], initialTotalPages }) => {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [tags, setTags] = useState([])
  const size = useContext(ResponsiveContext)

  const [gridFef, gridInView] = useInView({ delay: 1000 })
  const [loadMoreRef, loadMoreInView] = useInView()

  const [projects, setProjects] = useState(initialProjects)

  const filterProjects = useCallback(() => {
    setPage(1)
    const request = async () => {
      const response = await getAllProjects({
        tags: Object.values(tags),
        page: 1,
      })
      setProjects(response?.entries)
      setTotalPages(response?.totalPages)
    }
    request()
  }, [tags])

  const loadMoreProject = useCallback(() => {
    const request = async () => {
      const { entries } = await getAllProjects({
        tags: Object.values(tags),
        page,
      })
      setProjects((prevProjects) => [...prevProjects, ...entries])
    }
    request()
  }, [page, tags])

  useEffect(() => {
    if (loadMoreInView && page < totalPages) {
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

  return (
    <Main pad="xlarge" fill={false} justify="center" direction="row">
      <ReadableContent>
        <Box>
          <Filters onChange={setTags} />
        </Box>
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
            <motion.div
              key={slug}
              initial={gridInView ? "out" : false}
              animate={gridInView ? "in" : "out"}
              variants={cardAnimation}
              custom={{ index }}
            >
              <Project key={slug} name={name} slug={slug} thumbnail={devices} />
            </motion.div>
          ))}
        </Grid>
        {page < totalPages && <div ref={loadMoreRef}>load more</div>}
      </ReadableContent>
    </Main>
  )
}

export async function getStaticProps() {
  const { entries, totalPages } = await getAllProjects()
  // Next.js expects the props to be json stringify-able
  // https://dev.to/ryyppy/reason-records-nextjs-undefined-and-getstaticprops-5d46
  return {
    props: JSON.parse(
      JSON.stringify({
        initialProjects: [...entries],
        initialTotalPages: totalPages,
      })
    ),
  }
}

Projects.propTypes = {
  initialProjects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      thumbnail: PropTypes.shape({
        src: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Projects
