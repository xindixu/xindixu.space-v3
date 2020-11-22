import React, { useContext } from "react"
import PropTypes from "prop-types"
import { format, parseISO } from "date-fns"
import { Main, Box, ResponsiveContext } from "grommet"

import { getProject, getAllProjectSlugs } from "lib/contentful/project"
import Header from "components/header"
import RichText from "components/rich-text"
import InfoBox from "components/info-box"

const Project = ({ setHeaderRef, project = {} }) => {
  const { name, thumbnail, labels, description, demoLink, repoLink } = project

  const size = useContext(ResponsiveContext)

  return (
    <>
      <Header
        ref={setHeaderRef}
        name={name}
        labels={labels}
        background={{ url: thumbnail.src }}
        full={false}
      />

      <Box pad="xlarge" gap="large" direction="row" justify="center">
        {size === "large" && (
          <Box responsive={false}>
            <InfoBox demoLink={demoLink} repoLink={repoLink} />
          </Box>
        )}
        <Main width="xlarge" flex={false}>
          <RichText document={description} />
        </Main>
      </Box>
    </>
  )
}

export async function getStaticProps({ params: { slug } }) {
  const project = await getProject({ slug })
  return {
    props: JSON.parse(
      JSON.stringify({
        project,
        slug,
      })
    ),
  }
}

export async function getStaticPaths() {
  const paths = await getAllProjectSlugs()

  return {
    paths: paths.map((slug) => `/projects/${slug}`),
    fallback: true,
  }
}

Project.propTypes = {}

export default Project
