import React, { useState } from "react";
import { Box, Header, Button, Text } from "grommet";
import { Menu } from "grommet-icons";
import styled from "styled-components";
import Sidebar from "./sidebar";

const FixTop = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
`;

const Navbar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      <FixTop fill="horizontal">
        <Header
          background="brand"
          elevation="medium"
          pad={{ horizontal: "small", vertical: "xsmall" }}
        >
          <Text margin="none">XindiXu.Space</Text>
          <Button icon={<Menu />} onClick={() => setShowSideBar(true)} />
        </Header>
      </FixTop>
      <Sidebar show={showSideBar} onClose={() => setShowSideBar(false)} />
    </>
  );
};

export default Navbar;
