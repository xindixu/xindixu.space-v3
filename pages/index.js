import React from "react"
import styled from "styled-components"
import { Box } from "grommet"

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const Home = () => {
  return (
    <>
      <Title>Home page</Title>
      <Box>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis a</Box>
    </>
  )
}

export default Home
