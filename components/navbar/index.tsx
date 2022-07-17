import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Box, Header, Button, Anchor } from "grommet"
import { Sun, Moon, Menu } from "grommet-icons"
import { useTheme } from "next-themes"
import styled from "styled-components"
import { useWindowSize } from "react-use"
import Sidebar from "./sidebar"
import { DARK, LIGHT } from "lib/style-settings"

const FixTop = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`

const NoUnderlineLink = styled(Anchor)`
  &:hover {
    text-decoration: none;
  }
`

type TProps = {
  isHeaderInView: boolean
}

const Navbar = ({ isHeaderInView }: TProps) => {
  const [showSideBar, setShowSideBar] = useState(false)
  const { width } = useWindowSize()
  const { resolvedTheme, setTheme } = useTheme()
  const newTheme = resolvedTheme === LIGHT ? DARK : LIGHT
  const isDarkTheme = resolvedTheme === DARK
  // header in view & dark -> dark-2
  // hearer not in view & dark -> text
  // header in view & light -> dark-3
  // header not in view & light -> dark-3

  useEffect(() => {
    setShowSideBar(false)
  }, [width])

  const iconColor = isDarkTheme
    ? isHeaderInView
      ? "text"
      : "dark-2"
    : "dark-3"

  return (
    <>
      <FixTop fill="horizontal">
        <Header
          background={isHeaderInView ? undefined : "brand"}
          elevation={isHeaderInView ? undefined : "medium"}
          animation={
            isHeaderInView
              ? undefined
              : {
                  type: "fadeIn",
                  duration: 500,
                }
          }
          pad={{ horizontal: "small", vertical: "xsmall" }}
        >
          <Link href="/" passHref>
            <NoUnderlineLink color={iconColor}>XindiXu.Space</NoUnderlineLink>
          </Link>
          <Box direction="row">
            <Button
              icon={
                resolvedTheme === LIGHT ? (
                  <Moon color={iconColor} />
                ) : (
                  <Sun color={iconColor} />
                )
              }
              onClick={() => setTheme(newTheme)}
              a11yTitle={`toggle ${newTheme} mode`}
            />
            <Button
              icon={<Menu color={iconColor} />}
              onClick={() => setShowSideBar(true)}
              a11yTitle="open menu"
            />
          </Box>
        </Header>
      </FixTop>

      <Sidebar show={showSideBar} onClose={() => setShowSideBar(false)} />
    </>
  )
}

export default Navbar
