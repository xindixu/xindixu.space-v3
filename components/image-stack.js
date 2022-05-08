import React, { useState, useEffect } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Stack, Box } from "grommet"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"

const IMAGES = ["belo", "ut", "low-library", "college-walk"]

const AUTOPLAY_TIME = 3
const POSITION = 300

const StyledCard = styled(motion.div)`
  width: 500px;
  max-width: 100%;
  height: 300px;
`

const animation = {
  in: () => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      ease: "easeOut",
    },
  }),
  out: ({ x, y }) => ({
    opacity: 0,
    x: POSITION * x,
    y: POSITION * y,
    transition: { duration: 0.1 },
  }),
}

const ImageStack = () => {
  const [ref, inView] = useInView({ delay: 1000 })
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let timer
    if (inView) {
      timer = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % IMAGES.length)
      }, AUTOPLAY_TIME * 1000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [inView])

  return (
    <Box ref={ref}>
      <AnimatePresence>
        <Stack>
          <StyledCard
            key={IMAGES[index]}
            initial="out"
            exit="out"
            animate={inView ? "in" : "out"}
            variants={animation}
            custom={{ x: Math.random() - 0.5, y: Math.random() - 0.5 }}
          >
            <Box elevation="medium">
              <Image
                priority
                src={`/img/locations/${IMAGES[index]}.jpg`}
                layout="fill"
                objectFit="cover"
              />
            </Box>
          </StyledCard>
        </Stack>
      </AnimatePresence>
    </Box>
  )
}

export default ImageStack
