import React, { useContext, useState, useEffect } from "react"
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
} = styleSettings

const ActiveCard = styled(Card)`
  :hover {
    box-shadow: ${light.medium};
  }
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

const Projects = ({ initialProjects = [] }) => {
  const size = useContext(ResponsiveContext)
  const [ref, inView] = useInView({ delay: 1000 })
  const [projects, setProjects] = useState(initialProjects)

  const updateProjects = async (tags) => {
    const { entries } = await getAllProjects({ tags: Object.values(tags) })
    setProjects(entries)
  }

  return (
    <Main pad="xlarge" fill={false}>
      <Filters onChange={updateProjects} />
      <Grid
        gap="medium"
        margin={{ top: "medium" }}
        columns={{
          count: "fill",
          size: size === "small" ? "100%" : "medium",
        }}
        ref={ref}
      >
        {projects.map(({ name, slug, devices }, index) => (
          <motion.div
            key={slug}
            initial={inView ? "out" : false}
            animate={inView ? "in" : "out"}
            variants={cardAnimation}
            custom={{ index }}
          >
            <Project name={name} slug={slug} thumbnail={devices} />
          </motion.div>
        ))}
      </Grid>
    </Main>
  )
}

export async function getStaticProps() {
  const { entries } = await getAllProjects()
  // Next.js expects the props to be json stringify-able
  // https://dev.to/ryyppy/reason-records-nextjs-undefined-and-getstaticprops-5d46
  return {
    props: JSON.parse(
      JSON.stringify({
        // initialProjects: [],
        initialProjects: [...entries],
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
