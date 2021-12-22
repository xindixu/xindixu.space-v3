import React, { useState } from "react"
import Link from "next/link"
import { Box, Header, Button, Anchor } from "grommet"
import { Sun, Moon, Menu } from "grommet-icons"
import { useTheme } from "next-themes"
import styled from "styled-components"
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
const solidStyleProps = {
  background: "brand",
  elevation: "medium",
  animation: {
    type: "fadeIn",
    duration: 500,
  },
}

const Navbar = ({ isHeaderInView }) => {
  const [showSideBar, setShowSideBar] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const newTheme = resolvedTheme === LIGHT ? DARK : LIGHT
  return (
    <>
      <FixTop fill="horizontal">
        <Header
          {...(isHeaderInView ? {} : solidStyleProps)}
          pad={{ horizontal: "small", vertical: "xsmall" }}
        >
          <Link href="/" passHref>
            <NoUnderlineLink color="text">XindiXu.Space</NoUnderlineLink>
          </Link>
          <Box direction="row">
            <Button
              icon={resolvedTheme === LIGHT ? <Moon /> : <Sun />}
              onClick={() => setTheme(newTheme)}
              a11yTitle={`toggle ${newTheme} mode`}
            />
            <Button
              icon={<Menu />}
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
