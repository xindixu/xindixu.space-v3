import React, { useRef } from "react"
import { Box, Text } from "grommet"
import { motion } from "framer-motion"
import styled from "styled-components"
import { useMedia } from "react-use"
import { useInView } from "react-intersection-observer"
import BaseMap from "assets/svg/map.svg"
import styleSettings from "lib/style-settings"
import AnimatedSvg from "components/animated-svg"
import { mediaQuery } from "lib/style-settings/media-query"

const { spacerSm, spacerBase, pink } = styleSettings

const SIZE = 5

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
  padding-top: ${spacerSm};
`

const Date = styled(Text)`
  margin: 0;
  display: block;
`

const Label = ({ place, country, monthDay, year, position }) => {
  const isBigScreen = useMedia(mediaQuery.screenBaseAndUp)
  const isMediumScreen = useMedia(mediaQuery.screenSmAndUp)

  return (
    <Location position={position}>
      <HorizontalText>{place}</HorizontalText>
      <VerticalText>{country}</VerticalText>
      <Date size={isBigScreen ? "large" : isMediumScreen ? "medium" : "small"}>
        {monthDay}
        <br />
        {year}
      </Date>
    </Location>
  )
}

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

const smallScreenPositions = [20, 20, 5]
const bigScreenPositions = [20, 20, 5]

const Map = () => {
  const [ref, inView] = useInView({ delay: 1000 })
  const fuzhouToAustin = useRef(null)
  const austinToNewYorkCity = useRef(null)
  const isSmUp = useMedia(mediaQuery.screenSmAndUp)

  return (
    <Box fill ref={ref}>
      <AnimatedSvg viewBox="0 0 940 460" inView={inView}>
        {(props) => (
          <>
            <BaseMap />
            {/* Fuzhou */}
            <path
              strokeLinecap="round"
              strokeWidth={SIZE}
              stroke={pink}
              d="M360 220 h0"
            />
            {/* Austin */}
            <path
              strokeLinecap="round"
              strokeWidth={SIZE}
              stroke={pink}
              d="M740 210 h0"
            />

            {/* New York */}
            <path
              strokeLinecap="round"
              strokeWidth={SIZE}
              stroke={pink}
              d="M790 170 h0"
            />

            <motion.path
              strokeLinecap="round"
              strokeWidth={SIZE}
              stroke={pink}
              fill="none"
              d="M360 220 C500 0 650 100 740 210"
              ref={fuzhouToAustin}
              {...props}
            />

            <motion.path
              strokeLinecap="round"
              strokeWidth={SIZE}
              stroke={pink}
              fill="none"
              d="M740 210 C750 175 780 170 790 170"
              ref={austinToNewYorkCity}
              {...props}
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
              isSmUp ? bigScreenPositions[i] : smallScreenPositions[i]
            }%`}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Map
