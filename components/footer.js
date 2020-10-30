import React, { useState } from "react";
import { Footer, Layer } from "grommet";
import { links } from "contents/social-media";
import QuickMenu from "components/quick-menu";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Layer
      position="bottom-left"
      modal={false}
      animate={false}
      responsive={false}
      style={{ zIndex: 10, background: "none" }}
    >
      <Footer pad="small">
        <QuickMenu subMenu={links} isOpen={isOpen} setIsOpen={setIsOpen} />
      </Footer>
    </Layer>
  );
};

export default Index;
