import React from "react"
import PropTypes from "prop-types"
import { motion, useMotionValue } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Box } from "grommet"
import styled from "styled-components"
import { nameEn } from "assets/svg/name-en"
import { nameZh } from "assets/svg/name-zh"
import styleSettings from "lib/style-settings"

const { pink } = styleSettings

const SvgWrapper = styled(Box)`
  div,
  svg {
    width: 100%;
  }
`

const svgAnimation = {
  in: {
    pathLength: 1,
  },
  out: { pathLength: 0 },
}

const Name = (props) => {
  const [ref, isNameInView] = useInView({ delay: 1000 })
  const pathLength = useMotionValue(isNameInView ? 0 : 1)
  return (
    <SvgWrapper direction="row" width="medium">
      <Box ref={ref}>
        <svg viewBox="0 0 1084 316" xmlns="http://www.w3.org/2000/svg">
          <g
            transform="translate(0,316) scale(0.1,-0.1)"
            fill={pink}
            stroke="none"
          >
            {nameEn.map((d, index) => (
              <motion.path
                // eslint-disable-next-line react/no-array-index-key
                key={index}
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
        <svg viewBox="0 0 1084 424" xmlns="http://www.w3.org/2000/svg">
          <g
            transform="translate(0,424) scale(0.1,-0.1)"
            fill={pink}
            stroke="none"
          >
            {nameZh.map((d, index) => (
              <motion.path
                // eslint-disable-next-line react/no-array-index-key
                key={index}
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
      </Box>
    </SvgWrapper>
  )
}

Name.propTypes = {}

export default Name
