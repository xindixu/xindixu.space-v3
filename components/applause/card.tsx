import React from "react"
import styled, { css, useTheme } from "styled-components"
import { Box, Button, Card, CardBody, CardFooter, Text } from "grommet"
import { Previous, Next } from "grommet-icons"
import { format } from "date-fns"
import { MONTH_DAY_YEAR_FORMAT } from "utils/datetime"

type TProps = {
  createdAt: string
  index: number
  isXxsUp: boolean
  length: number
  likes: number
  message: string
  paginate: (direction: number) => void
  sender: { name: string; jobTitle: string }
}

const IconButton = styled(Button)`
  border-radius: 50%;
`

const StyledCard = styled(Card)<{ isXxsUp: boolean }>`
  ${({ isXxsUp }) =>
    isXxsUp
      ? ""
      : css`
          width: 100%;
        `}
`

const Base = ({
  createdAt,
  index,
  isXxsUp,
  length,
  likes,
  message,
  paginate,
  sender: { name, jobTitle },
}: TProps) => {
  const theme = useTheme()

  return (
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
              size="small"
              onClick={() => paginate(-1)}
            />
            <Text margin={{ horizontal: "small" }} size="small">
              {index + 1} of {length}
            </Text>
            <IconButton
              icon={<Next size="small" />}
              a11yTitle="next"
              size="small"
              onClick={() => paginate(1)}
            />
          </Box>
        </Box>
      </CardFooter>
    </StyledCard>
  )
}

export default Base
