import React from "react"
import { motion } from "framer-motion"

import styled from "styled-components"

import { Heading } from "grommet"

const Wrapper = styled(motion.div)`
  width: min-content;
`

const WavingHand = () => (
  <Wrapper
    animate={{ rotate: [0, 30, -10] }}
    transition={{ repeat: Infinity, repeatDelay: 0.5 }}
  >
    <Heading level={2}>
      <span role="img" aria-label="Waving Hand">
        👋
      </span>
    </Heading>
  </Wrapper>
)

export default WavingHand
