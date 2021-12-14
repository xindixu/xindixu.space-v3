import React, { useState, useEffect } from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Grommet as BaseGrommet } from "grommet"
import { motion } from "framer-motion"
import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from "next-themes"
import CommonLayout from "layout/common"
import useClick from "hooks/use-click"
import customTheme from "lib/style-settings/theme"

const GlobalStyle = createGlobalStyle`
  :root {
    /* Your default theme */
    --background: white;
    --foreground: black;
  }

  [data-theme='dark'] {
    --background: black;
    --foreground: white;
  }
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
const d = process.browser ? document : null

const Content = ({ Component, pageProps, router }) => {
  const { coordinates } = useClick({ node: d })
  const { resolvedTheme } = useNextTheme()
  // hacky way to handle server client theme mismatch
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const body = (
    <Grommet theme={customTheme} themeMode={resolvedTheme} full>
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

  if (!isMounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>
  }
  return body
}

const App = (props) => (
  <NextThemeProvider>
    <Content {...props} />
  </NextThemeProvider>
)

export default App
