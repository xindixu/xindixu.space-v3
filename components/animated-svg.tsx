import React, { FC } from "react"

const DURATION = 2
const svgAnimation = {
  in: ({ index = 0 } = {}) => ({
    pathLength: 1,
    transition: { delay: DURATION * index, duration: DURATION },
  }),
  out: { pathLength: 0, transition: { duration: 0.1 } },
}

type TProps = {
  children: (props: Object) => JSX.Element
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
