import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Main, Box } from "grommet"
import { useWindowScroll, useMedia } from "react-use"
import { getProject, getAllProjectSlugs } from "lib/content/project"
import Header from "components/header"
import RichText from "components/rich-text"
import InfoBox from "components/info-box"
import TableOfContent from "components/table-of-content"
import styleSettings from "lib/style-settings"
import { mediaQuery } from "lib/style-settings/media-query"

const { spacerXl, spacerXxl } = styleSettings

const Wrapper = styled.div`
  position: relative;
  margin-top: ${spacerXl};
`

const ReadableMain = styled(Main).attrs({
  align: "center",
  pad: { horizontal: "xlarge" },
})`
  & > div {
    width: 100%;
    max-width: 920px;
  }
`
const Spacer = styled(Box)`
  width: 920px;
  height: 300px;
  // background: beige;
  pointer-events: none;
`

const FloatingBox = styled(Box)`
  z-index: 1;
  position: fixed;
  left: 0;
  top: ${spacerXxl};
  justify-content: center;
  align-items: top;
`

const Project = ({ setHeaderRef, project = {} }) => {
  const {
    name,
    devices: { src, width, height } = {},
    labels,
    description,
    demoLink,
    repoLink,
  } = project

  const contentRef = useRef()
  const [showToolbox, setShowToolbox] = useState(false)
  const { y } = useWindowScroll()
  const isMdUp = useMedia(mediaQuery.screenMdAndUp)

  useEffect(() => {
    if (contentRef.current) {
      const { top } = contentRef.current.getBoundingClientRect()

      if (showToolbox && top > 0) {
        setShowToolbox(false)
      }
      if (!showToolbox && top < 0) {
        setShowToolbox(true)
      }
    }
  }, [showToolbox, y])

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

      <Wrapper>
        <ReadableMain>
          <div ref={contentRef}>
            <RichText mainContent={description} />
          </div>
        </ReadableMain>
        {isMdUp && (
          <FloatingBox
            direction="row"
            fill="horizontal"
            pad={{ horizontal: "small" }}
            gap="large"
          >
            <InfoBox
              demoLink={demoLink}
              repoLink={repoLink}
              show={showToolbox}
            />
            <Spacer />
            <TableOfContent mainContent={description} />
          </FloatingBox>
        )}
      </Wrapper>
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
