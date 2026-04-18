import React from "react"
import { Box, Text } from "grommet"
import { motion } from "framer-motion"
import styled, { useTheme } from "styled-components"
import { useInView } from "react-intersection-observer"
import BaseMap from "assets/svg/map.svg"
import styleSettings from "lib/style-settings"
import AnimatedSvg from "components/animated-svg"
import { media } from "lib/style-settings/media-query"
import useMedia from "hooks/use-media"
import { color } from "lib/style-settings/utils"

const { spacerBase, spacerXs, PINK, fontSizeLg, fontSizeSm, fontSizeBase } =
  styleSettings

const ROUTE_SIZE = 5
const PLACE_SIZE = 10

const Location = styled.div<{ position: string }>`
  ${({ position }) => `
      margin-left: ${position};
  `}
  display: block;
  position: relative;
  padding-right: ${spacerBase};
`

const HorizontalText = styled.div`
  text-wrap: nowrap;
`

const VerticalText = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  position: absolute;
  right: 0;
  top: ${spacerXs};
  text-wrap: nowrap;
`

const Date = styled(Text)`
  margin: 0;
  display: block;
  text-align: right;

  font-size: ${fontSizeSm};
  ${media.smUp`
    font-size: ${fontSizeBase};
  `}
  ${media.lgUp`
    font-size: ${fontSizeLg};
  `}
`

type TLabel = {
  monthDay: string
  city: string
  state: string
  year: string
}
const Label = ({
  monthDay,
  city,
  state,
  position,
  year,
}: TLabel & { position: string }) => (
  <Location position={position}>
    <HorizontalText>{state}</HorizontalText>
    <Date>
      {monthDay}
      <br />
      {year}
    </Date>
    <VerticalText>{city}</VerticalText>
  </Location>
)

const labels: TLabel[] = [
  {
    city: "Fuzhou",
    state: "Fujian",
    monthDay: "0324",
    year: "1998",
  },
  {
    city: "Bay Area",
    state: "CA",
    monthDay: "0524",
    year: "2023",
  },
  {
    city: "Austin",
    state: "TX",
    monthDay: "0809",
    year: "2016",
  },
  {
    city: "New York",
    state: "NY",
    monthDay: "0801",
    year: "2021",
  },
]

const xSmallScreenPositions = [10, 10, 5, 5]
const smallScreenPositions = [20, 20, 5, 5]
const bigScreenPositions = [20, 25, 5, 5]

const Map = () => {
  const theme = useTheme()
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

            {/* Bay Area */}
            <path
              strokeLinecap="round"
              strokeWidth={PLACE_SIZE}
              stroke={pink}
              d="M660 190 h0"
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

            <motion.path
              strokeLinecap="round"
              strokeWidth={ROUTE_SIZE}
              stroke={pink}
              fill="none"
              d="M790 170 C750 145 700 150 660 190"
              {...props}
              custom={{ index: 2 }}
            />
          </>
        )}
      </AnimatedSvg>
      <Box direction="row">
        {labels.map((props, i) => (
          <Label
            {...props}
            key={props.city}
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

export default Map
