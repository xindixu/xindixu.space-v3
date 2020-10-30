import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Box, Button, Layer, Nav, Sidebar as GSidebar } from "grommet";
import { Article, Briefcase, Diamond, Home, UserFemale } from "grommet-icons";

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

const Sidebar = ({ onClose, show }) =>
  show && (
    <Layer
      onEsc={onClose}
      onClickOutside={onClose}
      position="right"
      full="vertical"
    >
      <GSidebar
        responsive={false}
        header={<div />}
        footer={<SidebarFooter />}
        background="brand"
        // pad="medium"
        align="center"
      >
        <MainNavigation />
      </GSidebar>
    </Layer>
  );

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Sidebar;
