import React from "react"
import PropTypes from "prop-types"
import { useMotionValue } from "framer-motion"

const svgAnimation = {
  in: {
    pathLength: 1,
  },
  out: { pathLength: 0 },
}

const AnimatedSvg = ({ inView, viewBox, children }) => {
  const pathLength = useMotionValue(inView ? 0 : 1)

  return (
    <svg
      preserveAspectRatio="xMinYMin meet"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
    >
      {children({
        initial: "out",
        animate: inView ? "in" : "out",
        variants: svgAnimation,
        style: { pathLength },
        transition: { duration: 2 },
      })}
    </svg>
  )
}

AnimatedSvg.propTypes = {
  inView: PropTypes.bool.isRequired,
  viewBox: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}

export default AnimatedSvg
