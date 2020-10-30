import React, { useState } from "react";
import PropTypes from "prop-types";
import { Header, Button, Text } from "grommet";
import { Menu } from "grommet-icons";
import Sidebar from "./sidebar";

const Navbar = (props) => {
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

Navbar.propTypes = {};

export default Navbar;
