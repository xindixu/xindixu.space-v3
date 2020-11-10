import React, { useRef } from "react"
import PropTypes from "prop-types"
import { Box, Heading, Drop } from "grommet"
import { motion } from "framer-motion"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import BaseMap from "assets/svg/map.svg"
import styleSettings from "lib/style-settings"
import AnimatedSvg from "components/animated-svg"

const { spacer, pink } = styleSettings

const SIZE = 5

const Location = styled(Box)`
  ${({ position }) => `
      margin-left: ${position};
  `}
  margin-top: -${spacer};
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

const Map = () => {
  const [ref, inView] = useInView({ delay: 1000 })
  const lineRef = useRef(null)

  return (
    <Box fill ref={ref}>
      <AnimatedSvg viewBox="0 0 940 460" inView={inView}>
        {(props) => (
          <>
            <BaseMap />

            <path
              strokeLinecap="round"
              strokeWidth={SIZE}
              stroke={pink}
              d="M760 220 h0"
            />

            <path
              strokeLinecap="round"
              strokeWidth={SIZE}
              stroke={pink}
              d="M190 210 h0"
            />
            <motion.path
              strokeLinecap="round"
              strokeWidth={SIZE}
              stroke={pink}
              fill="none"
              d="M760 220 C 696 108 393 123 190 210"
              ref={lineRef}
              {...props}
            />
          </>
        )}
      </AnimatedSvg>

      <Box direction="row">
        <Label place="Austin, USA" monthDay="0809" year="2016" position="15%" />
        <Label
          place="Fuzhou, China"
          monthDay="0324"
          year="1998"
          position="50%"
        />
      </Box>
    </Box>
  )
}

Map.propTypes = {}

export default Map
