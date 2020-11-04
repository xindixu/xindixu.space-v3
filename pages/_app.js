import React from "react"
import { createGlobalStyle } from "styled-components"
import { Grommet } from "grommet"
import CommonLayout from "layout/common"
import customTheme from "lib/style-settings/theme"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: initial;
  }
`

const App = ({ Component, pageProps }) => (
  <>
    <Grommet theme={customTheme} full>
      <GlobalStyle />
      <CommonLayout>
        {({ setHeaderRef }) => (
          <Component {...pageProps} setHeaderRef={setHeaderRef} />
        )}
      </CommonLayout>
    </Grommet>
  </>
)

export default App
