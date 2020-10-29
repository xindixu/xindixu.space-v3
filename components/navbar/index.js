import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Text } from "grommet";
import { Menu } from "grommet-icons";
import Sidebar from "./sidebar";

const Navbar = (props) => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="brand"
        pad={{ left: "medium", right: "small", vertical: "small" }}
        elevation="medium"
        style={{ zIndex: "1" }}
        {...props}
      >
        <Text margin="none">XindiXu.Space</Text>
        <Button icon={<Menu />} onClick={() => setShowSideBar(true)} />
      </Box>
      <Sidebar show={showSideBar} onClose={() => setShowSideBar(false)} />
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;
