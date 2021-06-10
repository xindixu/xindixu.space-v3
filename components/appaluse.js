import React, { useState } from "react"
import styled from "styled-components"
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Stack,
  Text,
} from "grommet"
import { Previous, Next } from "grommet-icons"
import { AnimatePresence, motion } from "framer-motion"
import { format } from "date-fns"
import { applauses } from "contents/applauses"

const SHORT_DATE_FORMAT = "MMM d, yyyy"

const IconButton = styled(Button)`
  border-radius: 50%;
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

const Base = ({
  createdAt,
  index,
  length,
  likes,
  message,
  paginate,
  sender: { name, jobTitle },
}) => (
  <Card height="medium" width="medium" gap="medium" pad="medium">
    <CardHeader>
      <Heading level={4} margin="none">
        Applauses from my coworkers
      </Heading>
    </CardHeader>
    <CardBody>&ldquo;{message}&rdquo;</CardBody>
    <CardFooter direction="column" align="start">
      <Box direction="row" justify="start">
        <Text color="gray">&mdash;</Text>
        <Text color="gray" margin={{ horizontal: "xsmall" }} size="small">
          {name}, {jobTitle} <br />
          {format(new Date(createdAt), SHORT_DATE_FORMAT)}
        </Text>
      </Box>
      <Box direction="row" align="center" justify="between" fill="horizontal">
        <Box
          border="all"
          round="large"
          pad={{ vertical: "xxsmall", horizontal: "small" }}
        >
          <Text size="small">
            <span role="img" aria-label="Clapping hand">
              👏
            </span>{" "}
            {likes}
          </Text>
        </Box>
        <Box direction="row" align="center">
          <IconButton
            icon={<Previous size="small" />}
            a11yTitle="previous"
            round="full"
            size="small"
            disabled={index === 0}
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
            disabled={index === length - 1}
            onClick={() => paginate(1)}
          />
        </Box>
      </Box>
    </CardFooter>
  </Card>
)

const Appause = () => {
  const { length } = applauses

  const [[page, direction], setPage] = useState([0, 0])
  const index = page % length
  const { message, createdAt, sender, likes } = applauses[index]

  const paginate = (newDirection) =>
    setPage([page + newDirection, newDirection])

  return (
    <AnimatePresence initial={false} custom={direction}>
      <Stack anchor="top-right">
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
        >
          <Base
            createdAt={createdAt}
            index={index}
            length={length}
            likes={likes}
            message={message}
            paginate={paginate}
            sender={sender}
          />
        </motion.div>
      </Stack>
    </AnimatePresence>
  )
}

export default Appause
