import React, { useCallback, useEffect, useState } from "react"
import { Box, Stack } from "grommet"
import { AnimatePresence, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import useMedia from "hooks/use-media"

import Card from "./card"
import { applauses } from "contents/applauses"

const READING_TIME = 10000 // 10 secs
const AUTOPLAY_TIME = 5000 // 5 secs

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
}

const Applause = () => {
  const [ref, inView] = useInView({ delay: 1000 })
  const [paused, setPaused] = useState(false)
  const { length } = applauses

  const [[page, direction], setPage] = useState([0, 0])
  const index = page % length
  const { message, createdAt, sender, likes } = applauses[index]

  const isXxsUp = useMedia("xxs")

  const paginate = useCallback(
    (newDirection: number) =>
      setPage(([prevPage]) => [prevPage + newDirection, newDirection]),
    []
  )

  useEffect(() => {
    if (paused) {
      setTimeout(() => {
        setPaused(false)
      }, READING_TIME)
    }
  }, [paused])

  useEffect(() => {
    let timer: NodeJS.Timer
    if (inView && !paused) {
      timer = setInterval(() => {
        paginate(1)
      }, AUTOPLAY_TIME)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [inView, paginate, paused])

  return (
    <Box ref={ref}>
      <AnimatePresence initial={false} custom={direction}>
        <Stack anchor="top-right" alignSelf="center">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            style={{ width: isXxsUp ? "min-content" : undefined }}
          >
            <Card
              createdAt={createdAt}
              index={index}
              length={length}
              likes={likes}
              message={message}
              paginate={(newDirection) => {
                paginate(newDirection)
                setPaused(true)
              }}
              sender={sender}
              isXxsUp={isXxsUp}
            />
          </motion.div>
        </Stack>
      </AnimatePresence>
    </Box>
  )
}

export default Applause
