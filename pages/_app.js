import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Grommet as BaseGrommet } from "grommet"
import { motion } from "framer-motion"
import { ThemeProvider } from "next-themes"
import CommonLayout from "layout/common"
import useClick from "hooks/use-click"
import customTheme from "lib/style-settings/theme"
import { DARK, LIGHT } from "lib/style-settings"
import { isDarkMode } from "lib/style-settings/utils"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: initial;
  }
`

// This fix the bug where next.js wouldn't scroll back to top when page changes
const Grommet = styled(BaseGrommet)`
  overflow: initial;
`

const PageAnimate = styled(motion.div)`
  display: block;
  overflow: hidden;
  position: relative;
`

const pageAnimation = {
  pageInitial: ({ x, y }) => ({
    clipPath: `circle(0% at ${x}px ${y}px)`,
  }),
  pageAnimate: ({ x, y }) => ({
    clipPath: `circle(150% at ${x}px ${y}px)`,
    transition: {
      duration: 1,
    },
  }),
}

const Content = ({ Component, pageProps, router }) => {
  const d = process.browser ? document : null
  const { coordinates } = useClick({ node: d })
  const darkMode = isDarkMode(d)

  return (
    <Grommet theme={customTheme} themeMode={darkMode ? DARK : LIGHT} full>
      <GlobalStyle />
      <CommonLayout>
        {({ setContentRef, setHeaderRef, header, isXxsUp }) => (
          <PageAnimate
            key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
            variants={pageAnimation}
            custom={coordinates}
          >
            {header}
            <Component
              {...pageProps}
              setHeaderRef={setHeaderRef}
              setContentRef={setContentRef}
              isXxsUp={isXxsUp}
            />
          </PageAnimate>
        )}
      </CommonLayout>
    </Grommet>
  )
}

const App = ({ Component, pageProps, router }) => (
  <ThemeProvider>
    <Content Component={Component} pageProps={pageProps} router={router} />
  </ThemeProvider>
)

export default App
