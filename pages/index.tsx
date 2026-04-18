import React, { ReactNode, Suspense } from "react"
import {
  Main,
  Box,
  Paragraph,
  Button,
  Heading,
  BoxExtendedProps,
} from "grommet"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"

import Name from "components/name"

import { media } from "lib/style-settings/media-query"
import styleSettings from "lib/style-settings"
import useMedia from "hooks/use-media"
import { color } from "lib/style-settings/utils"
import { TPageProps } from "types/types"

const Applause = dynamic(() => import("components/applause"), {
  suspense: true,
})
const Contribution = dynamic(() => import("components/contribution"), {
  suspense: true,
})
const ImageStack = dynamic(() => import("components/image-stack"), {
  suspense: true,
})
const Map = dynamic(() => import("components/map"), {
  suspense: true,
})
const TechCloud = dynamic(() => import("components/tech-cloud"), {
  suspense: true,
})
const WavingHand = dynamic(() => import("components/waving-hand"), {
  suspense: true,
})

const { readable, BEIGE, spacerXl, spacerLg, spacerBase } = styleSettings

const Half = styled(Box).attrs({
  margin: { horizontal: "xlarge" },
  pad: { vertical: "large" },
})`
  & > div {
    max-width: 100%;
  }

  ${media.xlUp`
    & > div {
      max-width: 50%;
    }
  `}
`

const Left = styled(Half).attrs({
  direction: "row",
  margin: "none",
})``
const Right = styled(Half).attrs({
  direction: "row-reverse",
  margin: "none",
})``

const BaseReadableRow = styled(Box)`
  & > div {
    align-self: center;
    max-width: ${readable};
    width: 100%;
  }
`

const Avatar = styled(Image)`
  border-radius: 100%;
`

const Quote = styled.div`
  color: ${color(BEIGE)};
  font-size: ${spacerXl};
`

const LeftQuote = styled(Quote)`
  margin-top: ${spacerBase};
  margin-left: -${spacerBase};
`

const RightQuote = styled(Quote)`
  text-align: right;
  margin-top: ${spacerLg};
  margin-right: -${spacerBase};
`

const ReadableRow = ({
  children,
  isXxsUp,
  ...props
}: {
  children: ReactNode
  isXxsUp: boolean
} & BoxExtendedProps) => (
  <BaseReadableRow
    alignContent="center"
    pad={{ horizontal: isXxsUp ? "xlarge" : "medium" }}
    {...props}
  >
    <div>{children}</div>
  </BaseReadableRow>
)

const Index = ({ setContentRef, isXxsUp }: TPageProps) => {
  const isBaseUp = useMedia("base")

  return (
    // @ts-expect-error legacy ref
    <Main ref={setContentRef} fill={false} gap="large">
      <ReadableRow isXxsUp={isXxsUp}>
        <Left>
          <Box>
            <Box direction="row" gap="small">
              <Suspense fallback={null}>
                <WavingHand />
              </Suspense>
              <Heading level={2}> Hi there,</Heading>
            </Box>
            <Box>
              <Paragraph fill>
                I&apos;m currently a{" "}
                <strong>Technical Lead and Software Engineer</strong> at{" "}
                <strong>Instabase</strong>, where I lead the design and
                execution of complex, full-stack initiatives. Most recently, I
                architected the frontend for our <strong>SuperApp</strong>,
                enabling a unified experience across mobile and desktop from the
                ground up. I love diving deep into technical challenges—like
                building robust <strong>permission systems</strong>,{" "}
                <strong>real-time collaboration apps</strong>, or optimizing{" "}
                <strong>developer workflows</strong>—to create high-impact
                products that are as reliable as they are user-friendly.
              </Paragraph>
            </Box>
            <Box direction="row" align="center" justify="end" gap="large">
              <Name />
              <Box width="small" round="full">
                <Avatar
                  src="/img/shared/profile.jpg"
                  alt="profile picture of Xindi"
                  width={942}
                  height={942}
                />
              </Box>
            </Box>
          </Box>
        </Left>
      </ReadableRow>
      <ReadableRow isXxsUp={isXxsUp} background="background-front">
        <Right>
          <Box direction="column" gap="large" align="center">
            <Paragraph fill>
              My journey in tech is a blend of creative strategy and technical
              depth. I started at the{" "}
              <strong>University of Texas at Austin</strong> with a degree in{" "}
              <strong>Advertising</strong> and a minor in <strong>CS</strong>,
              which led to my first engineering role at Pingboard. To understand
              systems at a deeper level, I later earned my{" "}
              <strong>Master&apos;s in Computer Science</strong> from{" "}
              <strong>Columbia University</strong>, where I focused on{" "}
              <strong>
                Operating Systems, Distributed Systems, and Cloud Computing
              </strong>
              . I really enjoy bridging the gap between low-level system design
              and high-level product experience.
            </Paragraph>
            <Box>
              <Suspense fallback={null}>
                <ImageStack />
              </Suspense>
            </Box>
          </Box>
        </Right>
      </ReadableRow>
      <ReadableRow isXxsUp={isXxsUp}>
        <Left>
          <Box direction="column" gap="large" align="center">
            <Paragraph fill>
              I&apos;m proficient in TypeScript, Python, and Go. I&apos;ve been
              coding in React Native recently. Some frameworks and stacks I use
              to build cross-platform apps are <strong>React Native</strong>,{" "}
              <strong>Next.js</strong>, and <strong>Go</strong>.
            </Paragraph>
            <Box>
              <Suspense fallback={null}>
                <TechCloud />
              </Suspense>
            </Box>
          </Box>
        </Left>
      </ReadableRow>
      <ReadableRow isXxsUp={isXxsUp} background="background-front">
        <Right>
          <Box direction="column" gap="large" align="center">
            <Suspense fallback={null}>
              <Map />
            </Suspense>
            <Paragraph fill>
              I grew up in <strong>Fuzhou, China</strong>, and spent several
              years in <strong>Austin</strong> and <strong>New York</strong>{" "}
              before recently settling in <strong>Santa Clara</strong>. I made
              the move to California with my two cats, trading the New York
              bustle for the heart of Silicon Valley. Outside of work, I&apos;m
              a big fan of detective stories—both reading and watching them—and
              I spend my free time on coding side projects, gaming, or hitting
              the gym. I&apos;m also constantly on the hunt for the pho in the
              area!
            </Paragraph>
          </Box>
        </Right>
      </ReadableRow>
      <ReadableRow isXxsUp={isXxsUp}>
        <Left>
          <Box fill="horizontal">
            <Heading level={2}>Applauses from coworkers</Heading>
            <LeftQuote>&ldquo;</LeftQuote>
            <Box justify="center">
              <Suspense fallback={null}>
                <Applause />
              </Suspense>
            </Box>
            <RightQuote>&rdquo;</RightQuote>
          </Box>
        </Left>
      </ReadableRow>
      <ReadableRow isXxsUp={isXxsUp} background="background-front">
        <Right>
          <Box fill="horizontal" direction="column" gap="large">
            <Heading level={2}>Commits on GitHub</Heading>
            <Suspense fallback={null}>
              <Contribution />
            </Suspense>
          </Box>
        </Right>
      </ReadableRow>
      <ReadableRow isXxsUp={isXxsUp}>
        <Box
          direction={isBaseUp ? "row" : "column"}
          gap="medium"
          margin={{ horizontal: "large", bottom: "xlarge" }}
          pad={{ vertical: "large" }}
          justify="center"
        >
          <Link href="/projects" passHref>
            <Button
              as="a"
              secondary
              label="View Selected Projects"
              size="medium"
            />
          </Link>
          <Link href="/experiences" passHref>
            <Button
              as="a"
              secondary
              label="View My Experiences"
              size="medium"
            />
          </Link>
        </Box>
      </ReadableRow>
    </Main>
  )
}
export default Index
