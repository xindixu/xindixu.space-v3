import React, { useState } from "react";
import { Footer, Box } from "grommet";
import styled from "styled-components";
import { links } from "contents/social-media";
import QuickMenu from "components/quick-menu";

const FixBottom = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
`;

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FixBottom>
      <Footer pad="small">
        <QuickMenu subMenu={links} isOpen={isOpen} setIsOpen={setIsOpen} />
      </Footer>
    </FixBottom>
  );
};

export default Index;
