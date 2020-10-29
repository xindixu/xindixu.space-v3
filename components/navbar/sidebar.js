import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Button, Layer, Nav, Sidebar as GSidebar } from "grommet";
import {
  Home,
  Chat,
  UserFemale,
  Help,
  Briefcase,
  Diamond,
} from "grommet-icons";

const SidebarFooter = () => (
  <Nav>
    <SidebarButton icon={<Chat />} label="Chat" />
    <SidebarButton icon={<Help />} label="Support" />
  </Nav>
);

const SidebarButton = ({ icon, label, ...rest }) => (
  <Box fill>
    <Button hoverIndicator size="large" icon={icon} label={label} {...rest} />
  </Box>
);

const MainNavigation = () => (
  <Nav gap="medium" responsive={false}>
    <SidebarButton icon={<Home />} label="Home" />
    <SidebarButton icon={<UserFemale />} label="About" />
    <SidebarButton icon={<Briefcase />} label="Projects" />
    <SidebarButton icon={<Diamond />} label="Life" />
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
        pad="medium"
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
