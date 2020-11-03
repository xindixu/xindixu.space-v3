import React from "react"
import PropTypes from "prop-types"
import { Main, WorldMap, Box, Paragraph, ThemeContext, Heading } from "grommet"
import styled from "styled-components"
import Name from "components/name"
import { media } from "lib/style-settings/media-query"
import styleSettings from "lib/style-settings"

const { spacerLg } = styleSettings

const Half = styled(Box).attrs({
  margin: { vertical: "medium" },
})`
  & > div {
    max-width: 100%;
  }

  ${media.screenMdUp`
    & > div {
      max-width: 50%;
    }
  `}
`

const Left = styled(Half)``

const Right = styled(Half)``

const WordMapWithActivePlace = styled(WorldMap)`
  [role="button"] {
    stroke-width: 20px;
  }
`

const Location = styled(Box)`
  ${({ position }) => `
      margin-left: ${position};
  `}
  margin-top: -${spacerLg};
`
const Label = ({ place, monthDay, year, position }) => (
  <Location position={position}>
    <span>{place}</span>
    <Heading size="small">
      {monthDay}
      <br />
      {year}
    </Heading>
  </Location>
)

const Index = () => {
  return (
    <Main pad="xlarge" fill={false}>
      <Left direction="row">
        <div>
          <Name />
          <Box>
            <Paragraph fill>
              I enjoy designing and implementing full-stack features with
              complex functionalities at Pingboard. I&apos;ve helped migrate
              legacy front-end code to modern technologies. I&apos;m passionate
              about improving user experience and understand technologies on a
              deeper level.
            </Paragraph>
            <Paragraph fill>
              I graduated with an Advertising major with Element of Computing
              Certificate and a Business Minor at the University of Texas at
              Austin. I earned the Element of Computing Certificate by taking 30
              hours of Computer Science classes. I mastered software engineering
              principles and worked with peers to design and built full-stack
              web apps, iOS apps, games, and computer graphics.
            </Paragraph>
          </Box>
        </div>
      </Left>
      <Right direction="row-reverse">
        <div>
          <ThemeContext.Extend
            value={{
              worldMap: {
                place: { active: "8px" },
                hover: { color: "light-3" },
              },
            }}
          >
            <WordMapWithActivePlace
              color="light-3"
              places={[
                {
                  name: "Fuzhou, Fujian",
                  location: [26.0745, 119.2965],
                  color: "brand",
                  onClick: () => {},
                },
                {
                  name: "Austin, TX",
                  location: [30.2672, -97.7431],
                  color: "brand",
                  onClick: () => {},
                },
              ]}
              selectColor="accent-2"
            />
          </ThemeContext.Extend>
          <Box direction="row">
            <Label
              place="Austin, USA"
              monthDay="0809"
              year="2016"
              position="20%"
            />
            <Label
              place="Fuzhou, China"
              monthDay="0324"
              year="1998"
              position="50%"
            />
          </Box>
        </div>
      </Right>
    </Main>
  )
}

Index.propTypes = {}

export default Index
