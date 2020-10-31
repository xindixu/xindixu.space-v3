import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useMedia } from "react-use";
import { Box, Button, Layer, Nav, Sidebar as GSidebar } from "grommet";
import { Close } from "grommet-icons";
import { motion, AnimatePresence } from "framer-motion";
import { mediaQuery } from "lib/style-settings/media-query";
import styleSettings from "lib/style-settings";
import { links } from "contents/routes";

const { pink, black } = styleSettings;

const GradientBackground = styled(GSidebar)`
  ${({ isBigScreen }) => `
    background: linear-gradient(
      0deg,
      ${black}BB -10%,
      ${pink}${isBigScreen ? "88" : "BB"} 90%,
      ${pink} 100%
    );
`}
`;

const circleMenuAnimation = {
  visible: {
    clipPath: "circle(1500px at 110% -10%)",
    transition: {
      when: "beforeChildren",
      type: "spring",
      stiffness: 40,
      restDelta: 2,
      duration: 0.5,
    },
  },
  hidden: {
    clipPath: "circle(50px at 110% -10%)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const slideMenuAnimation = {
  visible: {
    x: 0,
    transition: {
      when: "beforeChildren",
      duration: 0.5,
    },
  },
  hidden: {
    x: 300,
    transition: {
      delay: 0.5,
    },
  },
};

const linkAnimation = {
  visible: ({ index }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + 0.1 * index,
    },
  }),
  hidden: ({ index, count }) => ({
    opacity: 0,
    y: -10,

    transition: {
      delay: 0.1 * (count - index),
    },
  }),
};

const SidebarFooter = () => "Built with Next.js";

const SidebarButton = ({ icon, label, link, onClick, active, show }) => (
  <Link href={link}>
    <Button
      hoverIndicator
      full="horizontal"
      size="large"
      icon={icon}
      label={label}
      onClick={onClick}
      active={active}
      color="white"
      margin={{ horizontal: "large" }}
      style={{ background: "white" }}
    />
  </Link>
);

const MainNavigation = ({ onClose, pathname, show }) => (
  <Nav gap="medium" full="horizontal" alignSelf="stretch">
    {links.map(({ icon, name, link }, index) => (
      <motion.div
        key={name}
        initial={show ? "hidden" : "visible"}
        animate={show ? "visible" : "hidden"}
        exit="hidden"
        variants={linkAnimation}
        custom={{ index, count: links.length }}
      >
        <SidebarButton
          key={name}
          icon={icon}
          label={name}
          link={link}
          onClick={onClose}
          show={show}
        />
      </motion.div>
    ))}
  </Nav>
);

const Sidebar = ({ onClose, show }) => {
  const isBigScreen = useMedia(mediaQuery.screenBaseAndUp);
  const { pathname } = useRouter();
  return (
    <Box>
      <AnimatePresence>
        {show && (
          <Layer
            animation="none"
            position="right"
            full="vertical"
            modal
            onClickOutside={onClose}
            onEsc={onClose}
            elevation="medium"
            style={{ background: "none" }}
          >
            <motion.div
              key="sidebar"
              variants={isBigScreen ? slideMenuAnimation : circleMenuAnimation}
              exit="hidden"
              initial={show ? "hidden" : "visible"}
              animate={show ? "visible" : "hidden"}
              style={{ height: "100%" }}
            >
              <GradientBackground
                header={
                  <Button
                    icon={<Close />}
                    hoverIndicator
                    alignSelf="end"
                    onClick={onClose}
                  />
                }
                footer={<SidebarFooter />}
                align="center"
                full="vertical"
              >
                <MainNavigation
                  onClose={onClose}
                  pathname={pathname}
                  show={show}
                />
              </GradientBackground>
            </motion.div>
          </Layer>
        )}
      </AnimatePresence>
    </Box>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Sidebar;
