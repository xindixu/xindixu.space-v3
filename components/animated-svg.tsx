import React, { FC } from "react"
import type { Variants } from "framer-motion"

const DURATION = 2
const svgAnimation: Variants = {
  in: ({ index = 0 } = {}) => ({
    pathLength: 1,
    transition: { delay: DURATION * index, duration: DURATION },
  }),
  out: { pathLength: 0, transition: { duration: 0.1 } },
}

type TProps = {
  children: ({
    initial,
    animate,
    variants,
  }: {
    initial: string
    animate: string
    variants: Variants
  }) => React.ReactElement
  inView: boolean
  viewBox: string
}

const AnimatedSvg: FC<TProps> = ({ children, inView, viewBox }) => (
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

export default AnimatedSvg
