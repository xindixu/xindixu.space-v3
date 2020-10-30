import React from "react";
import PropTypes from "prop-types";
import { Box, Grommet } from "grommet";
import Navbar from "components/navbar";
import Header from "components/header";
import Footer from "components/footer";

const Common = ({ children }) => {
  return (
    <>
      <Navbar />
      <Header />
      {children}
      <Footer />
    </>
  );
};

Common.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Common;
