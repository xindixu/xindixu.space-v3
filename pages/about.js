import React from "react"
import PropTypes from "prop-types"
import { motion, useMotionValue } from "framer-motion"
import { useInView } from "react-intersection-observer"

import { Main, WorldMap, Box, Paragraph, ThemeContext } from "grommet"
import styled from "styled-components"
import { name } from "assets/svg/name"
import styleSettings from "lib/style-settings"
import { media } from "lib/style-settings/media-query"

const { pink, spacerSm } = styleSettings
const SvgWrapper = styled(Box)`
  div,
  svg {
    width: 100%;
    height: 100%;
  }
`

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

const svgAnimation = {
  in: {
    pathLength: 1,
  },
  out: { pathLength: 0 },
}

const About = () => {
  const [ref, isNameInView] = useInView({ delay: 1000 })
  const pathLength = useMotionValue(isNameInView ? 0 : 1)

  return (
    <Main pad="xlarge">
      <Left>
        <div>
          <SvgWrapper direction="row" width="medium">
            <div ref={ref}>
              <svg viewBox="0 0 1010 344" xmlns="http://www.w3.org/2000/svg">
                <g
                  transform="translate(0,344) scale(0.1,-0.1)"
                  fill={pink}
                  stroke="none"
                >
                  {name.map((d, index) => (
                    <motion.path
                      fill="transparent"
                      d={d}
                      stroke={pink}
                      strokeWidth="40"
                      custom={index}
                      initial="out"
                      animate={isNameInView ? "in" : "out"}
                      variants={svgAnimation}
                      style={{ pathLength }}
                      transition={{ duration: 2 }}
                    />
                  ))}
                </g>
              </svg>
            </div>
          </SvgWrapper>
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
                  onClick: (name) => {},
                  onHover: (name) => {},
                },
                {
                  name: "Austin, TX",
                  location: [30.2672, -97.7431],
                  color: "brand",
                  onClick: (name) => {},
                  onHover: (name) => {},
                },
              ]}
              selectColor="accent-2"
            />
          </ThemeContext.Extend>
          <div>0</div>
        </div>
      </Right>
    </Main>
  )
}

About.propTypes = {}

export default About
