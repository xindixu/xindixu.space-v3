import React from "react";
import { createGlobalStyle } from "styled-components";
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
    primary: "#e2b4bd",
  },
  heading: {
    font: {
      family: "'Dancing Script', cursive",
    },
  },
  global: {
    colors: {
      brand: "#e2b4bd",
    },
    font: {
      size: "16px",
      family: "'Lato', sans-serif",
    },
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <Grommet theme={theme} full>
        <GlobalStyle />
        <CommonLayout>
          <Component {...pageProps} />
        </CommonLayout>
      </Grommet>
    </>
  );
}
