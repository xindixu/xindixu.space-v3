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
import { NextRouter } from "next/router"
import { TPageProps } from "types/types"

const GlobalStyle = createGlobalStyle`
  :root {
    /* Your default theme */
    --background: "#FFFFFF";
    --foreground: black;
  }

  [data-theme='dark'] {
    --background: "#111111";
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
  height: 100%;
`

const PageAnimate = styled(motion.div)`
  display: block;
  overflow: hidden;
  position: relative;
`

const pageAnimation = {
  pageInitial: ({ x, y }: { x: number; y: number }) => ({
    clipPath: `circle(0% at ${x}px ${y}px)`,
  }),
  pageAnimate: ({ x, y }: { x: number; y: number }) => ({
    clipPath: `circle(150% at ${x}px ${y}px)`,
    transition: {
      duration: 1,
    },
  }),
}
const d = typeof window !== "undefined" ? document : null

type TProps = {
  Component: React.ComponentType<TPageProps>
  pageProps: {}
  router: NextRouter
}

const Content = ({ Component, pageProps, router }: TProps) => {
  const { coordinates } = useClick({ node: d })
  const { resolvedTheme } = useNextTheme()
  // hacky way to handle server client theme mismatch
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const body = (
    // @ts-expect-error grommet theme
    <Grommet theme={customTheme} themeMode={resolvedTheme}>
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
              isXxsUp={isXxsUp}
              setContentRef={setContentRef}
              setHeaderRef={setHeaderRef}
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

const App = (props: any) => (
  <NextThemeProvider>
    <Content {...props} />
  </NextThemeProvider>
)

export default App
