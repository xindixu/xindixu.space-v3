import React from "react";
import PropTypes from "prop-types";
import { Footer, Layer } from "grommet";
import { links } from "contents/social-media";
import QuickMenu from "components/quick-menu";

const Index = (props) => {
  return (
    <Layer
      position="bottom-left"
      modal={false}
      animate={false}
      style={{ zIndex: 10 }}
    >
      <Footer pad="small">
        <QuickMenu subMenu={links} />
      </Footer>
    </Layer>
  );
};

Index.propTypes = {};

export default Index;
