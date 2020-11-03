import React from "react"
import PropTypes from "prop-types"
import { motion, useMotionValue } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Box } from "grommet"
import styled from "styled-components"
import { name } from "assets/svg/name"
import styleSettings from "lib/style-settings"

const { pink } = styleSettings

const SvgWrapper = styled(Box)`
  div,
  svg {
    width: 100%;
    height: 100%;
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
      <div ref={ref}>
        <svg
          viewBox="0 0 1010 344"
          xmlns="http://www.w3.org/2000/svg"
          ref={ref}
        >
          <g
            transform="translate(0,344) scale(0.1,-0.1)"
            fill={pink}
            stroke="none"
          >
            {name.map((d, index) => (
              <motion.path
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
      </div>
    </SvgWrapper>
  )
}

Name.propTypes = {}

export default Name
