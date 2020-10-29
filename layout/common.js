import React from "react";
import PropTypes from "prop-types";
import { Box, Grommet } from "grommet";
import Navbar from "components/navbar/index";

const Common = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

Common.propTypes = {};

export default Common;
