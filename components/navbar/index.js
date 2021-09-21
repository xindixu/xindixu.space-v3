import React, { useState } from "react"
import Link from "next/link"
import { Box, Header, Button, Text, Anchor } from "grommet"
import { Menu } from "grommet-icons"
import styled from "styled-components"
import Sidebar from "./sidebar"

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
  return (
    <>
      <FixTop fill="horizontal">
        <Header
          {...(isHeaderInView ? {} : solidStyleProps)}
          pad={{ horizontal: "small", vertical: "xsmall" }}
        >
          <Link href="/" passHref>
            <NoUnderlineLink color="dark-3">XindiXu.Space</NoUnderlineLink>
          </Link>
          <Button
            icon={<Menu />}
            onClick={() => setShowSideBar(true)}
            a11yTitle="open menu"
          />
        </Header>
      </FixTop>

      <Sidebar show={showSideBar} onClose={() => setShowSideBar(false)} />
    </>
  )
}

export default Navbar
