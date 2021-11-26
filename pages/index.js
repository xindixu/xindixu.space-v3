import React from "react"
import PropTypes from "prop-types"
import { Main, Box, Paragraph, Button, Heading } from "grommet"
import { motion } from "framer-motion"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import Applause from "components/applause"
import Name from "components/name"
import Map from "components/map"
import Contribution from "components/contribution"
import { media } from "lib/style-settings/media-query"
import styleSettings from "lib/style-settings"
import useMedia from "hooks/use-media"

const { readable, beigeLight, spacerXl, spacerLg, spacerBase } = styleSettings

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

const BaseReadableRow = styled(Box).attrs(({ isXxsUp }) => ({
  alignContent: "center",
  pad: { horizontal: isXxsUp ? "xlarge" : "medium" },
}))`
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
  color: ${beigeLight};
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

const ReadableRow = ({ children, ...props }) => (
  <BaseReadableRow {...props}>
    <div>{children}</div>
  </BaseReadableRow>
)

const Index = ({ setContentRef, isXxsUp }) => {
  const isBaseUp = useMedia("base")

  return (
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
                user experience and understand technologies on a deeper level.
                I&apos;m building web apps, using JavaScript, React, and Vue,
                but also curious on other applications of CS.
              </Paragraph>
              <Paragraph fill>
                I&apos;m currently pursing a Master of Science in Computer
                Science at Columbia University. This semester, I&apos;m taking
                classes in AI, Engineering Software-as-a-Service, Programming
                Languages and Translators, and Analysis of Algorithms. Before
                coming to Columbia, I was a Software Engineer at Pingboard,
                where I worked in teams to build fully fledged features in a
                timely manner.
              </Paragraph>
              <Paragraph fill>
                In 2020, I graduated from the University of Texas at Austin,
                with a Bachelor of Science in Advertising and Minor in Computer
                Science. I took 30 credit hours of Computer Science classes and
                mastered software engineering principles via working with peers
                to design and build full-stack web apps, iOS apps, games, and
                computer graphics.
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
              align="center"
            />
          </Link>
          <Link href="/experiences" passHref>
            <Button
              as="a"
              secondary
              label="View My Life Story"
              size="medium"
              align="center"
            />
          </Link>
        </Box>
      </ReadableRow>
    </Main>
  )
}

Index.defaultProps = {
  setContentRef: () => {},
}

Index.propTypes = {
  setContentRef: PropTypes.func,
}

export default Index
