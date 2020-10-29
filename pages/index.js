import React from "react";
import styled from "styled-components";
import { Box } from "grommet";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home() {
  return (
    <>
      <Title>My page</Title>
      <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
        <Box flex align="center" justify="center">
          app body
        </Box>
        <Box
          width="medium"
          background="light-2"
          elevation="small"
          align="center"
          justify="center"
        >
          sidebar
        </Box>
      </Box>
    </>
  );
}
