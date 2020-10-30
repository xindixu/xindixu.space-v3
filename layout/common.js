import React from "react";
import PropTypes from "prop-types";
import { Box, Grommet } from "grommet";
import Navbar from "components/navbar";
import Footer from "components/footer";

const Common = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

Common.propTypes = {};

export default Common;
