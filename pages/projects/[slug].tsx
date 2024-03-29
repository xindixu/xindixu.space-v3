import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import { Main, Box, Button } from "grommet"
import { GetStaticPaths, GetStaticProps } from "next"
import { useWindowScroll } from "react-use"
import { Previous } from "grommet-icons"

import { getProject, getAllProjectSlugs } from "lib/content/project"
import Header from "components/header"
import RichText from "components/rich-text"
import InfoBox from "components/info-box"
import TableOfContent from "components/table-of-content"
import MetaBox from "components/meta-box"
import styleSettings from "lib/style-settings"
import useMedia from "hooks/use-media"
import { TPageProps } from "types/types"
import { TParsedProject } from "lib/content/types"

const { spacerXxl } = styleSettings

const THRESHOLD = 150
const Wrapper = styled.div`
  position: relative;
`

const ReadableMain = styled(Main)`
  position: relative;

  & > div {
    width: 100%;
    max-width: 920px;
  }
`
const Spacer = styled(Box)`
  width: 920px;
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

const TopBox = styled(Box)<{ hide: boolean }>`
  ${({ hide }) => `
    opacity: ${hide ? 0 : 1};
  `}
`

type TProps = {
  project: TParsedProject
} & TPageProps

const Project = ({ isXxsUp, project, setHeaderRef }: TProps) => {
  const {
    name,
    start,
    end,
    devices: { src, width, height } = {},
    labels,
    description,
    demoLink,
    repoLink,
    tags,
  } = project

  const contentRef = useRef<HTMLElement>()
  const [showToolbox, setShowToolbox] = useState(false)
  const [activeHeader, setActiveHeader] = useState("")
  const { y } = useWindowScroll()
  const isXlUp = useMedia("xl")
  const router = useRouter()

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

  useEffect(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll("h2, h3")

      if (!headings) {
        return
      }
      const displayHeadingIndex = [...headings].findIndex((heading) => {
        const { top } = heading.getBoundingClientRect()
        return top > 72
      })
      const index =
        displayHeadingIndex - 1 >= 0 ? displayHeadingIndex : headings.length

      setActiveHeader(headings[index - 1]?.id)
    }
  }, [showToolbox, y])

  return (
    <>
      <Header
        background={{
          src: `https:${src}`,
          width,
          height,
          alt: `devices showing different screenshots of project ${name}`,
        }}
        full={false}
        labels={labels}
        name={name}
        setHeaderRef={setHeaderRef}
      />

      <Wrapper>
        <ReadableMain
          align="center"
          pad={{
            horizontal: isXxsUp ? "xlarge" : "medium",
            vertical: "xlarge",
          }}
          margin={{ bottom: "xlarge" }}
        >
          <TopBox
            fill
            hide={isXlUp && showToolbox}
            margin={{ bottom: "medium" }}
            direction="row"
            align="center"
            justify="between"
          >
            <MetaBox tags={tags} start={start} end={end} />
            <InfoBox demoLink={demoLink} repoLink={repoLink} show horizontal />
          </TopBox>
          {/* @ts-expect-error legacy ref */}
          <div ref={contentRef}>
            <RichText mainContent={description} />
            <Button
              margin={{ top: "medium" }}
              icon={<Previous size="small" />}
              label="Back"
              onClick={() => router.back()}
              secondary
            />
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
            <TableOfContent
              mainContent={description}
              show={showToolbox}
              activeHeader={activeHeader}
            />
          </FloatingBox>
        )}
      </Wrapper>
    </>
  )
}

type TStaticProps = {
  slug: string
}

export const getStaticProps: GetStaticProps<TStaticProps> = async ({
  params: { slug } = {},
}) => {
  if (!slug || Array.isArray(slug)) {
    return {
      props: JSON.parse(
        JSON.stringify({
          project: {},
        })
      ),
    }
  }

  const project = await getProject({ slug })
  return {
    props: JSON.parse(
      JSON.stringify({
        project,
      })
    ),
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllProjectSlugs()

  return {
    paths: paths.map((slug) => `/projects/${slug}`),
    fallback: false,
  }
}

export default Project
