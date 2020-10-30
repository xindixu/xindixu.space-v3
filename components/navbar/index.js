import React, { useState } from "react";
import { Header, Button, Text } from "grommet";
import { Menu } from "grommet-icons";
import Sidebar from "./sidebar";

const Navbar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      <Header
        background="brand"
        elevation="medium"
        pad={{ horizontal: "small", vertical: "xsmall" }}
      >
        <Text margin="none">XindiXu.Space</Text>
        <Button icon={<Menu />} onClick={() => setShowSideBar(true)} />
      </Header>
      <Sidebar show={showSideBar} onClose={() => setShowSideBar(false)} />
    </>
  );
};

export default Navbar;
