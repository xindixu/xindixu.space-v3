import React from "react"
import styled from "styled-components"
import { Main, Box, Tabs, Tab, Text } from "grommet"
import { experiences } from "contents/experiences"
import Timeline from "components/timeline"

const VerticalTab = styled(Tabs)`
  flex-direction: row;

  & > div {
    flex-direction: column;
    justify-content: start;
  }
`

const Experiences = () => {
  return (
    <>
      <Main pad="xlarge" justify="center" direction="row" fill={false}>
        <Box width="xlarge">
          <Timeline />
        </Box>
      </Main>
    </>
  )
}

export default Experiences
