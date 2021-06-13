import React from "react"
import PropTypes from "prop-types"

const DURATION = 2
const svgAnimation = {
  in: ({ index = 0 } = {}) => ({
    pathLength: 1,
    transition: { delay: DURATION * index, duration: DURATION },
  }),
  out: { pathLength: 0, transition: { duration: 0.1 } },
}

const AnimatedSvg = ({ inView, viewBox, children }) => (
  <svg
    preserveAspectRatio="xMinYMin meet"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox}
    role="presentation"
  >
    {children({
      initial: "out",
      animate: inView ? "in" : "out",
      variants: svgAnimation,
    })}
  </svg>
)

AnimatedSvg.propTypes = {
  inView: PropTypes.bool.isRequired,
  viewBox: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}

export default AnimatedSvg
