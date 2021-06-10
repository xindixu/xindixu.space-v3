import React, { useState } from "react"
import styled from "styled-components"
import {
  Box,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Button,
} from "grommet"
import { Previous, Next } from "grommet-icons"
// import { useCycle, motion } from "framer-motion"
import { format } from "date-fns"
import { applauses } from "contents/applauses"

const SHORT_DATE_FORMAT = "MMM d, yyyy"

const IconButton = styled(Button)`
  border-radius: 50%;
`

const Appause = () => {
  const { length } = applauses
  const [index, setIndex] = useState(0)
  const { message, createdAt, sender, likes } = applauses[index]

  return (
    // <motion.div
    //   animate={{
    //     scale: [1, 2, 2, 1, 1],
    //     rotate: [0, 0, 270, 270, 0],
    //     borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    //   }}
    //   transition={{
    //     duration: 2,
    //     ease: "easeInOut",
    //     times: [0, 0.2, 0.5, 0.8, 1],
    //     loop: Infinity,
    //     repeatDelay: 1,
    //   }}
    //   style={{ background: "red", borderRadius: 30, width: 150, height: 150 }}
    // />
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
            {sender.name}, {sender.jobTitle} <br />
            {format(new Date(createdAt), SHORT_DATE_FORMAT)}
          </Text>
        </Box>
        <Box direction="row" align="center" justify="between" fill="horizontal">
          <Box
            border="all"
            round="large"
            pad={{ vertical: "xxsmall", horizontal: "small" }}
          >
            <Text size="small">👏 {likes}</Text>
          </Box>
          <Box direction="row" align="center">
            <IconButton
              icon={<Previous size="small" />}
              a11yTitle="previous"
              round="full"
              size="small"
              disabled={index === 0}
              onClick={() => setIndex((prevIndex) => prevIndex - 1)}
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
              onClick={() => setIndex((prevIndex) => prevIndex + 1)}
            />
          </Box>
        </Box>
      </CardFooter>
    </Card>
  )
}

export default Appause
