import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useMedia } from "react-use";
import { Button, Layer, Nav, Sidebar as GSidebar } from "grommet";
import { Close } from "grommet-icons";
import { mediaQuery } from "lib/style-settings/media-query";
import { links } from "contents/routes";

const SidebarFooter = () => "Built with Next.js";

const SidebarButton = ({ icon, label, link, onClick, active }) => (
  <Link href={link}>
    <Button
      hoverIndicator
      full="horizontal"
      size="large"
      icon={icon}
      label={label}
      onClick={onClick}
      active={active}
    />
  </Link>
);

const MainNavigation = ({ onClose, pathname }) => (
  <Nav gap="medium" full="horizontal" alignSelf="stretch">
    {links.map(({ icon, name, link }) => (
      <SidebarButton
        icon={icon}
        label={name}
        link={link}
        onClick={onClose}
        active={link === pathname}
      />
    ))}
  </Nav>
);

const GradientBackground = styled(GSidebar)``;

const Sidebar = ({ onClose, show }) => {
  const isBigScreen = useMedia(mediaQuery.screenBaseAndUp);
  const { pathname } = useRouter();
  return (
    show && (
      <Layer
        position="right"
        full="vertical"
        modal
        onClickOutside={onClose}
        onEsc={onClose}
        elevation="medium"
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
          full="vertical"
        >
          <MainNavigation onClose={onClose} pathname={pathname} />
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
