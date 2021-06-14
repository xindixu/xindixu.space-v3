import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import styled from "styled-components"
import { Main, Box, Button, Text } from "grommet"
import { useWindowScroll } from "react-use"
import { Previous } from "grommet-icons"
import { getProject, getAllProjectSlugs } from "lib/content/project"
import Header from "components/header"
import RichText from "components/rich-text"
import InfoBox from "components/info-box"
import TableOfContent from "components/table-of-content"
import styleSettings from "lib/style-settings"
import useMedia from "hooks/use-media"
import { formatDuration } from "utils/datetime"

const { spacerXl, spacerXxl } = styleSettings

const THRESHOLD = 150
const Wrapper = styled.div`
  position: relative;
  margin-top: ${spacerXl};
`

const ReadableMain = styled(Main).attrs({
  align: "center",
  pad: { horizontal: "xlarge", bottom: "xlarge" },
})`
  & > div {
    width: 100%;
    max-width: 920px;
  }
`
const Spacer = styled(Box)`
  width: 920px;
  pointer-events: none;
  // background: beige;
`

const FloatingBox = styled(Box)`
  z-index: 1;
  position: fixed;
  left: 0;
  top: ${spacerXxl};
  justify-content: center;
  align-items: top;
`

const TopBox = styled(Box)`
  ${({ hide }) => `
    opacity: ${hide ? 0 : 1};
  `}
`

const Project = ({ setHeaderRef, project }) => {
  const {
    name,
    start,
    end,
    devices: { src, width, height } = {},
    labels,
    description,
    demoLink,
    repoLink,
  } = project
  console.log(project)

  const contentRef = useRef()
  const [showToolbox, setShowToolbox] = useState(false)
  const { y } = useWindowScroll()

  const isXlUp = useMedia("xl")

  useEffect(() => {
    if (contentRef.current) {
      const { top } = contentRef.current.getBoundingClientRect()

      if (showToolbox && top > THRESHOLD) {
        setShowToolbox(false)
      }
      if (!showToolbox && top < THRESHOLD) {
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
          <TopBox
            fill
            hide={isXlUp && showToolbox}
            justify="between"
            direction="row"
            align="center"
          >
            <Text size="small" color="dark-2">
              {formatDuration({ start, end })}
            </Text>
            <InfoBox demoLink={demoLink} repoLink={repoLink} show horizontal />
          </TopBox>

          <div ref={contentRef}>
            <RichText mainContent={description} />
            <Link href="/projects" passHref>
              <Button
                as="a"
                margin={{ top: "medium" }}
                icon={<Previous size="small" />}
                label="Back"
                primary
              />
            </Link>
          </div>
        </ReadableMain>
        {isXlUp && (
          <FloatingBox
            direction="row"
            fill="horizontal"
            pad={{ horizontal: "small" }}
            gap="large"
          >
            <InfoBox
              demoLink={demoLink}
              horizontal={false}
              repoLink={repoLink}
              show={showToolbox}
            />
            <Spacer />
            <TableOfContent mainContent={description} show={showToolbox} />
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
    fallback: false,
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
