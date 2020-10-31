import React, { useState } from "react"
import { Box, Header, Button, Text } from "grommet"
import { Menu } from "grommet-icons"
import styled from "styled-components"
import Sidebar from "./sidebar"

const FixTop = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
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
          <Text margin="none">XindiXu.Space</Text>
          <Button icon={<Menu />} onClick={() => setShowSideBar(true)} />
        </Header>
      </FixTop>

      <Sidebar show={showSideBar} onClose={() => setShowSideBar(false)} />
    </>
  )
}

export default Navbar
