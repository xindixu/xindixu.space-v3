import React, { useState } from "react";
import PropTypes from "prop-types";
import { Footer, Layer } from "grommet";
import { links } from "contents/social-media";
import QuickMenu from "components/quick-menu";

const Index = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Layer
      position="bottom-left"
      modal={false}
      animate={false}
      responsive={false}
      style={{ zIndex: 10 }}
    >
      <Footer pad="small">
        <QuickMenu subMenu={links} isOpen={isOpen} setIsOpen={setIsOpen} />
      </Footer>
    </Layer>
  );
};

Index.propTypes = {};

export default Index;
