import React from "react"
import { Box } from "grommet"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import styled from "styled-components"
import { nameEn } from "assets/svg/name-en"
import { nameZh } from "assets/svg/name-zh"
import styleSettings from "lib/style-settings"
import AnimatedSvg from "components/animated-svg"

const { pink } = styleSettings

const SvgWrapper = styled(Box)`
  div,
  svg {
    width: 100%;
  }
`

const names = [
  {
    paths: nameEn,
    height: 316,
    width: 1084,
  },
  {
    paths: nameZh,
    height: 424,
    width: 1084,
  },
]

const Name = () => {
  const [ref, inView] = useInView({ delay: 1000 })

  return (
    <SvgWrapper direction="row" width="small">
      <Box ref={ref}>
        {names.map(({ paths, height, width }, nameIndex) => (
          <AnimatedSvg
            inView={inView}
            // eslint-disable-next-line react/no-array-index-key
            key={nameIndex}
            viewBox={`0 0 ${width} ${height}`}
          >
            {(props) => (
              <g
                transform={`translate(0,${height}) scale(0.1,-0.1)`}
                fill={pink}
                stroke="none"
              >
                {paths.map((d, index) => (
                  <motion.path
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    fill="transparent"
                    d={d}
                    stroke={pink}
                    strokeWidth="40"
                    {...props}
                  />
                ))}
              </g>
            )}
          </AnimatedSvg>
        ))}
      </Box>
    </SvgWrapper>
  )
}

export default Name
