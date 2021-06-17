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

const { readable, beige, spacerXl, spacerLg, spacerBase } = styleSettings
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
  color: ${beige};
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

const Index = ({ setContentRef }) => {
  const isXxsUp = useMedia("xxs")
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
                complex functionalities at Pingboard. I&apos;ve helped migrate
                legacy front-end code to modern technologies. I&apos;m
                passionate about improving user experience and understand
                technologies on a deeper level.
              </Paragraph>
              <Paragraph fill>
                I graduated with an Advertising major with Element of Computing
                Certificate and a Business Minor at the University of Texas at
                Austin. I earned the Element of Computing Certificate by taking
                30 hours of Computer Science classes. I mastered software
                engineering principles and worked with peers to design and built
                full-stack web apps, iOS apps, games, and computer graphics.
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
      <ReadableRow isXxsUp={isXxsUp} background="bg-paper">
        <Right>
          <Box direction="column" gap="large" align="center">
            <Map />
            <Paragraph fill>
              I spent the first 18 years of my life in Fuzhou, China. I missed
              all my close friends and tasty foodies there. I moved to Austin,
              TX for my undergrad at University of Texas at Austin. After
              graduation, I worked at Pingboard as a Software Engineer for a
              year. Soon, I&apos;ll join Columbia University as a MSCS student.
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
      <ReadableRow isXxsUp={isXxsUp} background="bg-paper">
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
              primary
              label="View Selected Projects"
              size="medium"
            />
          </Link>
          <Link href="/experiences" passHref>
            <Button as="a" primary label="View My Life Story" size="medium" />
          </Link>
        </Box>
      </ReadableRow>
    </Main>
  )
}

Index.propTypes = {
  setContentRef: PropTypes.func,
}

export default Index
