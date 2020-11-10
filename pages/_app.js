import React from "react"
import styled, { createGlobalStyle } from "styled-components"
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

// This fix the bug where next.js wouldn't scroll back to top when page changes
const NoOverflow = styled(Grommet)`
  overflow: initial;
`

const App = ({ Component, pageProps }) => (
  <>
    <NoOverflow theme={customTheme} full>
      <GlobalStyle />
      <CommonLayout>
        {({ setContentRef, setHeaderRef }) => (
          <Component
            {...pageProps}
            setHeaderRef={setHeaderRef}
            setContentRef={setContentRef}
          />
        )}
      </CommonLayout>
    </NoOverflow>
  </>
)

export default App
