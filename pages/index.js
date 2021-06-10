import React from "react"
import PropTypes from "prop-types"
import { Main, Box, Paragraph, Text } from "grommet"
import styled from "styled-components"
import Image from "next/image"
import Name from "components/name"
import Map from "components/map"
import Applause from "components/appaluse"
import { media } from "lib/style-settings/media-query"

const Half = styled(Box).attrs({
  margin: { horizontal: "xlarge" },
  pad: { vertical: "large" },
})`
  & > div {
    max-width: 100%;
  }

  ${media.screenXlUp`
    & > div {
      max-width: 50%;
    }
  `}
`

const Left = styled(Half).attrs({
  direction: "row",
})``
const Right = styled(Half).attrs({
  direction: "row-reverse",
})``
const Avatar = styled(Image)`
  border-radius: 100%;
`

const Index = ({ setContentRef }) => (
  <Main ref={setContentRef} fill={false} gap="large">
    <Left>
      <div>
        <Text size="xxlarge">
          <span role="img" aria-label="Waving Hand">
            👋
          </span>{" "}
          Hi there,
        </Text>
        <Box pad={{ vertical: "medium" }}>
          <Paragraph fill>
            I enjoy designing and implementing full-stack features with complex
            functionalities at Pingboard. I&apos;ve helped migrate legacy
            front-end code to modern technologies. I&apos;m passionate about
            improving user experience and understand technologies on a deeper
            level.
          </Paragraph>
          <Paragraph fill>
            I graduated with an Advertising major with Element of Computing
            Certificate and a Business Minor at the University of Texas at
            Austin. I earned the Element of Computing Certificate by taking 30
            hours of Computer Science classes. I mastered software engineering
            principles and worked with peers to design and built full-stack web
            apps, iOS apps, games, and computer graphics.
          </Paragraph>
        </Box>
      </div>
    </Left>
    <Right>
      <Box direction="row" align="center" gap="large">
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
    </Right>
    <Box background="bg-paper">
      <Left>
        <Map />
      </Left>
      <Right>
        <div>
          <Paragraph fill>
            I spent the first 18 years of my life in Fuzhou, China. I missed all
            my close friends and tasty foodies there. I moved to Austin, TX for
            my undergrad at University of Texas at Austin. After graduation, I
            worked at Pingboard as a Software Engineer for a year. Soon,
            I&apos;ll join Columbia University as a MSCS student.
          </Paragraph>
        </div>
      </Right>
    </Box>

    <Left>
      <Applause />
    </Left>
  </Main>
)

Index.propTypes = {
  setContentRef: PropTypes.func.isRequired,
}

export default Index
