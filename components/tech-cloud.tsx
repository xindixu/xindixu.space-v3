import React from "react"
import { TagCloud } from "react-tagcloud"
import { motion } from "framer-motion"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import useMedia from "hooks/use-media"

import TECH_WORDS, { TTag } from "contents/tech"

const COLOR_OPTIONS = {
  luminosity: "light",
  hue: "purple",
}

const StyledTagCloud = styled(TagCloud)`
  width: 100%;
  max-width: 700px;
  text-align: center;
`

const Tag = styled(motion.span)<{
  color: string
  size: number
  isBaseUp: boolean
}>`
  ${({ color, size, isBaseUp }) => `
    color: ${color};
    font-size: ${size}px;
    margin: ${isBaseUp ? "10px" : "5px"};
  `}
  display: inline-block;
`

const DURATION = 2
const POSITION = 30
const BASE_UP_SIZE = {
  minSize: 20,
  maxSize: 35,
}
const BASE_DOWN_SIZE = {
  minSize: 15,
  maxSize: 30,
}

const animation = {
  in: () => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: DURATION * Math.random(),
      duration: DURATION,
      ease: "easeOut",
    },
  }),
  out: () => ({
    opacity: 0,
    x: POSITION * (Math.random() - 0.5),
    y: POSITION * (Math.random() - 0.5),
    transition: { duration: 0.1 },
  }),
}

const renderTag = ({
  color,
  inView,
  isBaseUp,
  size,
  tag,
}: {
  color: string
  inView: boolean
  isBaseUp: boolean
  size: number
  tag: TTag
}) => (
  <Tag
    key={tag.value}
    animate={inView ? "in" : "out"}
    color={color}
    initial="out"
    isBaseUp={isBaseUp}
    size={size}
    variants={animation}
  >
    {tag.value}
  </Tag>
)

const TechCloud = () => {
  const [ref, inView] = useInView({ delay: 1000 })
  const isBaseUp = useMedia("base")
  return (
    <div ref={ref}>
      <StyledTagCloud
        {...(isBaseUp ? BASE_UP_SIZE : BASE_DOWN_SIZE)}
        tags={TECH_WORDS}
        colorOptions={COLOR_OPTIONS}
        renderer={(tag: TTag, size: number, color: string) =>
          renderTag({ color, inView, isBaseUp, size, tag })
        }
      />
    </div>
  )
}

export default TechCloud
