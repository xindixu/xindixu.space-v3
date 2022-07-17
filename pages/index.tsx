import React, { ReactNode } from "react"
import {
  Main,
  Box,
  Paragraph,
  Button,
  Heading,
  BoxExtendedProps,
} from "grommet"
import { motion } from "framer-motion"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import Applause from "components/applause"
import Name from "components/name"
import Map from "components/map"
import TechCloud from "components/tech-cloud"
import Contribution from "components/contribution"
import { media } from "lib/style-settings/media-query"
import styleSettings from "lib/style-settings"
import useMedia from "hooks/use-media"
import { color } from "lib/style-settings/utils"
import ImageStack from "components/image-stack"
import { TPageProps } from "types/types"

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

const Hand = styled(motion.div)`
  width: min-content;
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
              <Hand
                animate={{ rotate: [0, 30, -10] }}
                transition={{ loop: Infinity, repeatDelay: 0.5 }}
              >
                <Heading level={2}>
                  <span role="img" aria-label="Waving Hand">
                    👋
                  </span>
                </Heading>
              </Hand>
              <Heading level={2}> Hi there,</Heading>
            </Box>
            <Box>
              <Paragraph fill>
                I enjoy designing and implementing full-stack features with
                complex functionalities. I&apos;m passionate about improving
                user experience and understanding technologies on a deeper
                level. I&apos;m an{" "}
                <strong>
                  Master student in Computer Science at Columbia University
                </strong>
                . My favorite classes I took there are{" "}
                <strong>Operating Systems</strong>,{" "}
                <strong>Distributed Systems</strong>, and{" "}
                <strong>Cloud Computing</strong>. This summer, I&apos;m
                interning at <strong>Instabase</strong> as a Software Engineer
                on the <strong>Core Services</strong> team.
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
              Before coming to Columbia, I was a Software Engineer at Pingboard,
              where I worked in teams to build fully-fledged features promptly.
              In 2020, I graduated from{" "}
              <strong>University of Texas at Austin</strong>, with a{" "}
              <strong>BS in Advertising and a Minor in Computer Science</strong>
              . I took 30 credit hours of Computer Science classes and mastered
              software engineering principles via working with peers to design
              and build full-stack web apps, iOS apps, games, and computer
              graphics.
            </Paragraph>
            <Box>
              <ImageStack />
            </Box>
          </Box>
        </Right>
      </ReadableRow>
      <ReadableRow isXxsUp={isXxsUp}>
        <Left>
          <Box direction="column" gap="large" align="center">
            <Paragraph fill>
              I&apos;m proficient in JavaScript and Python. I&apos;ve been
              coding in C/C++, TypeScript, and Go recently. Some frameworks and
              stacks I use to build web apps are React/Redux, Next.js, AWS, Ruby
              on Rails, and Python Flask.
            </Paragraph>
            <Box>
              <TechCloud />
            </Box>
          </Box>
        </Left>
      </ReadableRow>
      <ReadableRow isXxsUp={isXxsUp} background="background-front">
        <Right>
          <Box direction="column" gap="large" align="center">
            <Map />
            <Paragraph fill>
              I spent the first 18 years of my life in Fuzhou, China. I miss all
              my close friends and tasty foodies there. I moved to Austin, TX
              for my undergrad. This summer, I drove with my kitties from Austin
              to New York. Bye Texas summer heat and hello New York winter
              chill~
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
              <Applause />
            </Box>
            <RightQuote>&rdquo;</RightQuote>
          </Box>
        </Left>
      </ReadableRow>
      <ReadableRow isXxsUp={isXxsUp} background="background-front">
        <Right>
          <Box fill="horizontal" direction="column" gap="large">
            <Heading level={2}>Commits on GitHub</Heading>
            <Contribution />
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
