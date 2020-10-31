import React from "react";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import { Main } from "grommet";
import Navbar from "components/navbar";
import Header from "components/header";
import Footer from "components/footer";

const Common = ({ children }) => {
  const [ref, isHeaderInView] = useInView({ threshold: 0.05 });

  return (
    <>
      <Navbar isHeaderInView={isHeaderInView} />
      <Header ref={ref} />
      <Main pad="large">{children}</Main>
      <Footer />
    </>
  );
};

Common.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Common;
