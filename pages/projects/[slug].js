import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Main, Box, ResponsiveContext } from "grommet"

import { getProject, getAllProjectSlugs } from "lib/contentful/project"
import Header from "components/header"
import RichText from "components/rich-text"
import InfoBox from "components/info-box"

const Project = ({ setHeaderRef, project = {} }) => {
  const {
    name,
    thumbnail: { src } = {},
    labels,
    description,
    demoLink,
    repoLink,
  } = project

  const size = useContext(ResponsiveContext)

  return (
    <>
      <Header
        ref={setHeaderRef}
        name={name}
        labels={labels}
        background={{ url: src }}
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

Project.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      src: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  setHeaderRef: PropTypes.func.isRequired,
}

export default Project
