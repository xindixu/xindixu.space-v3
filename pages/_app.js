import React from "react";
import { createGlobalStyle } from "styled-components";
import { useRouter } from "next/router";
import { Grommet } from "grommet";
import CommonLayout from "layout/common";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: "#ADC178",
  },
  global: {
    colors: {
      brand: "#ADC178",
    },
    font: {
      size: "18px",
      height: "20px",
    },
  },
};

export default function App({ Component, pageProps }) {
  const route = useRouter();

  return (
    <>
      <Grommet full theme={theme}>
        <GlobalStyle />
        <CommonLayout>
          <Component {...pageProps} />
        </CommonLayout>
      </Grommet>
    </>
  );
}
