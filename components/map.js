import React from "react"
import { Box, Text } from "grommet"
import { motion } from "framer-motion"
import styled, { withTheme } from "styled-components"
import { useInView } from "react-intersection-observer"
import BaseMap from "assets/svg/map.svg"
import styleSettings from "lib/style-settings"
import AnimatedSvg from "components/animated-svg"
import { media } from "lib/style-settings/media-query"
import useMedia from "hooks/use-media"
import { color } from "lib/style-settings/utils"

const { spacerSm, spacerBase, PINK, fontSizeLg, fontSizeSm, fontSizeBase } =
  styleSettings

const ROUTE_SIZE = 5
const PLACE_SIZE = 10

const Location = styled.div`
  ${({ position }) => `
      margin-left: ${position};
  `}
  margin-top: -${spacerBase};
  display: block;
`

const HorizontalText = styled.div`
  padding-bottom: ${spacerSm};
`

const VerticalText = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  float: right;
  padding-top: 4px;
`

const Date = styled(Text)`
  margin: 0;
  display: block;

  font-size: ${fontSizeSm};
  ${media.smUp`
    font-size: ${fontSizeBase};
  `}
  ${media.lgUp`
    font-size: ${fontSizeLg};
  `}
`

const Label = ({ place, country, monthDay, year, position }) => (
  <Location position={position}>
    <HorizontalText>{place}</HorizontalText>
    <VerticalText>{country}</VerticalText>
    <Date>
      {monthDay}
      <br />
      {year}
    </Date>
  </Location>
)

const labels = [
  {
    place: "Fuzhou, Fujian",
    country: "China",
    monthDay: "0324",
    year: "1998",
  },
  {
    place: "Austin, Texas",
    country: "U.S.A",
    monthDay: "0809",
    year: "2016",
  },
  {
    place: "NYC, New York",
    country: "U.S.A",
    monthDay: "0801",
    year: "2021",
  },
]

const xSmallScreenPositions = [5, 20, 5]
const smallScreenPositions = [20, 20, 5]
const bigScreenPositions = [20, 30, 5]

const Map = ({ theme }) => {
  const [ref, inView] = useInView({ delay: 1000 })

  const isXsUp = useMedia("xs")
  const isSmUp = useMedia("sm")
  const pink = color(PINK)({ theme })
  return (
    <Box fill ref={ref} width={{ max: "large" }}>
      <AnimatedSvg inView={inView} viewBox="0 0 940 460">
        {(props) => (
          <>
            <BaseMap />
            {/* Fuzhou */}
            <path
              strokeLinecap="round"
              strokeWidth={PLACE_SIZE}
              stroke={pink}
              d="M360 220 h0"
            />
            {/* Austin */}
            <path
              strokeLinecap="round"
              strokeWidth={PLACE_SIZE}
              stroke={pink}
              d="M740 210 h0"
            />

            {/* New York */}
            <path
              strokeLinecap="round"
              strokeWidth={PLACE_SIZE}
              stroke={pink}
              d="M790 170 h0"
            />

            <motion.path
              strokeLinecap="round"
              strokeWidth={ROUTE_SIZE}
              stroke={pink}
              fill="none"
              d="M360 220 C500 0 650 100 740 210"
              {...props}
              custom={{ index: 0 }}
            />

            <motion.path
              strokeLinecap="round"
              strokeWidth={ROUTE_SIZE}
              stroke={pink}
              fill="none"
              d="M740 210 C750 175 780 170 790 170"
              {...props}
              custom={{ index: 1 }}
            />
          </>
        )}
      </AnimatedSvg>
      <Box direction="row">
        {labels.map((props, i) => (
          <Label
            {...props}
            key={props.year}
            position={`${
              isXsUp
                ? isSmUp
                  ? bigScreenPositions[i]
                  : smallScreenPositions[i]
                : xSmallScreenPositions[i]
            }%`}
          />
        ))}
      </Box>
    </Box>
  )
}

export default withTheme(Map)
