import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Main, Box, ResponsiveContext } from "grommet"
import { getProject, getAllProjectSlugs } from "lib/content/project"
import Header from "components/header"
import RichText from "components/rich-text"
import InfoBox from "components/info-box"

const Project = ({ setHeaderRef, project = {} }) => {
  const {
    name,
    devices: { src, width, height } = {},
    labels,
    description,
    demoLink,
    repoLink,
  } = project

  const size = useContext(ResponsiveContext)

  return (
    <>
      <Header
        full={false}
        ref={setHeaderRef}
        name={name}
        labels={labels}
        background={{
          src: `https:${src}`,
          width,
          height,
          alt: `devices showing different screenshots of project ${name}`,
        }}
      />

      <Box
        pad="xlarge"
        gap="large"
        direction={size === "large" ? "row" : "column"}
        justify="center"
      >
        <Box
          responsive={false}
          direction={size === "large" ? "column" : "row"}
          gap="small"
        >
          <InfoBox demoLink={demoLink} repoLink={repoLink} />
        </Box>

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
    devices: PropTypes.shape({
      src: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  setHeaderRef: PropTypes.func.isRequired,
}

export default Project
