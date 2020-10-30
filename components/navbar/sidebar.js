import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { useMedia } from "react-use";
import { Box, Button, Layer, Nav, Sidebar as GSidebar } from "grommet";
import {
  Article,
  Briefcase,
  Diamond,
  Home,
  UserFemale,
  Close,
} from "grommet-icons";
import { mediaQuery } from "lib/style-settings/media-query";

const SidebarFooter = () => "Built with Next.js";

const SidebarButton = ({ icon, label, link }) => (
  <Box fill>
    <Link href={link}>
      <Button hoverIndicator size="large" icon={icon} label={label} />
    </Link>
  </Box>
);

const MainNavigation = () => (
  <Nav gap="medium" responsive={false}>
    <SidebarButton icon={<Home />} label="Home" link="/" />
    <SidebarButton icon={<UserFemale />} label="About" link="/about" />
    <SidebarButton icon={<Briefcase />} label="Projects" link="/project" />
    <SidebarButton icon={<Diamond />} label="Life" link="/life" />
    <SidebarButton icon={<Article />} label="Blog" link="/blog" />
  </Nav>
);

const Sidebar = ({ onClose, show }) => {
  const isBigScreen = useMedia(mediaQuery.screenBaseAndUp);

  return (
    show && (
      <Layer
        onEsc={onClose}
        onClickOutside={onClose}
        position="right"
        full="vertical"
      >
        <GSidebar
          responsive={false}
          header={
            isBigScreen ? (
              <div />
            ) : (
              <Button
                icon={<Close />}
                hoverIndicator
                alignSelf="end"
                onClick={onClose}
              />
            )
          }
          footer={<SidebarFooter />}
          background="brand"
          // pad="medium"
          align="center"
        >
          <MainNavigation />
        </GSidebar>
      </Layer>
    )
  );
};
Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Sidebar;
