import React, { useCallback, useEffect, useState } from "react"
import styled, { withTheme } from "styled-components"
import { Box, Button, Card, CardBody, CardFooter, Stack, Text } from "grommet"
import { Previous, Next } from "grommet-icons"
import { AnimatePresence, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { format } from "date-fns"
import { applauses } from "contents/applauses"
import { MONTH_DAY_YEAR_FORMAT } from "utils/datetime"
import useMedia from "hooks/use-media"

const READING_TIME = 10000 // 10 secs
const AUTOPLAY_TIME = 5000 // 5 secs
const IconButton = styled(Button)`
  border-radius: 50%;
`

const StyledCard = styled(Card)`
  ${({ isXxsUp }) =>
    isXxsUp ||
    `
      width: 100%;
    `}
`

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
}

const Base = withTheme(
  ({
    createdAt,
    index,
    length,
    likes,
    message,
    paginate,
    sender: { name, jobTitle },
    isXxsUp,
    theme,
  }) => (
    <StyledCard
      height="medium"
      width="medium"
      gap="medium"
      pad="medium"
      isXxsUp={isXxsUp}
      background={theme.dark ? "background-front" : "background"}
    >
      <CardBody>&ldquo;{message}&rdquo;</CardBody>
      <CardFooter direction="column" align="start">
        <Box direction="row" justify="start">
          <Text color="gray">&mdash;</Text>
          <Text color="gray" margin={{ horizontal: "xsmall" }} size="small">
            {name}, {jobTitle} <br />
            {format(new Date(createdAt), MONTH_DAY_YEAR_FORMAT)}
          </Text>
        </Box>
        <Box direction="row" align="center" justify="between" fill="horizontal">
          <Box
            border="all"
            round="large"
            pad={{ vertical: "xxsmall", horizontal: "small" }}
          >
            <Box direction="row">
              <Text size="small" margin={{ right: "xsmall" }}>
                <span role="img" aria-label="Clapping hand">
                  👏
                </span>
              </Text>
              <Text size="small">{likes}</Text>
            </Box>
          </Box>
          <Box direction="row" align="center">
            <IconButton
              icon={<Previous size="small" />}
              a11yTitle="previous"
              round="full"
              size="small"
              onClick={() => paginate(-1)}
            />
            <Text margin={{ horizontal: "small" }} size="small">
              {index + 1} of {length}
            </Text>
            <IconButton
              icon={<Next size="small" />}
              a11yTitle="next"
              round="full"
              size="small"
              onClick={() => paginate(1)}
            />
          </Box>
        </Box>
      </CardFooter>
    </StyledCard>
  )
)

const Appause = () => {
  const [ref, inView] = useInView({ delay: 1000 })
  const [paused, setPaused] = useState(false)
  const { length } = applauses

  const [[page, direction], setPage] = useState([0, 0])
  const index = page % length
  const { message, createdAt, sender, likes } = applauses[index]

  const isXxsUp = useMedia("xxs")

  const paginate = useCallback(
    (newDirection) =>
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
    let timer
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
            <Base
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

export default Appause
