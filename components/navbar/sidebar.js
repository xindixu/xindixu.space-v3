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
import { links } from "contents/routes";

const SidebarFooter = () => "Built with Next.js";

const SidebarButton = ({ icon, label, link, onClick }) => (
  <Box fill>
    <Link href={link}>
      <Button
        hoverIndicator
        size="large"
        icon={icon}
        label={label}
        onClick={onClick}
      />
    </Link>
  </Box>
);

const MainNavigation = ({ onClose }) => (
  <Nav gap="medium">
    {links.map(({ icon, label, link }) => (
      <SidebarButton icon={icon} label={label} link={link} onClick={onClose} />
    ))}
  </Nav>
);

const Sidebar = ({ onClose, show }) => {
  const isBigScreen = useMedia(mediaQuery.screenBaseAndUp);

  return (
    show && (
      <Layer
        position="right"
        full="vertical"
        modal
        onClickOutside={onClose}
        onEsc={onClose}
      >
        <GSidebar
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
          align="center"
        >
          <MainNavigation onClose={onClose} />
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
