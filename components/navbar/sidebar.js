import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"
import { useRouter } from "next/router"
import styled from "styled-components"
import { Box, Button, Layer, Nav, Sidebar as GSidebar, Text } from "grommet"
import { Close } from "grommet-icons"
import { motion, AnimatePresence } from "framer-motion"
import styleSettings from "lib/style-settings"
import { links } from "contents/routes"
import useMedia from "hooks/use-media"

const { pink, black } = styleSettings

const GradientBackground = styled(GSidebar)`
  ${({ isBaseUp }) => `
    background: linear-gradient(
      0deg,
      ${black}BB -10%,
      ${pink}${isBaseUp ? "88" : "BB"} 90%,
      ${pink} 100%
    );
`}
`

const circleMenuAnimation = {
  visible: {
    clipPath: "circle(1500px at 110% -10%)",
    transition: {
      duration: 0.3,
      restDelta: 2,
      stiffness: 40,
      type: "spring",
      when: "beforeChildren",
    },
  },
  hidden: {
    clipPath: "circle(50px at 110% -10%)",
    transition: {
      damping: 40,
      delay: 0.2,
      stiffness: 400,
      type: "spring",
    },
  },
}

const slideMenuAnimation = {
  visible: {
    x: 0,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
  hidden: {
    x: 350,
    transition: {
      delay: 0.5,
      duration: 0.2,
    },
  },
}

const linkAnimation = {
  visible: ({ index }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + 0.1 * index,
    },
  }),
  hidden: ({ index, count }) => ({
    opacity: 0,
    y: -10,
    transition: {
      delay: 0.1 * (count - index),
    },
  }),
}

const SidebarFooter = () => <Text color="light-5">Built with Next.js</Text>

const SidebarButton = ({ icon, label, link, onClick, active }) => (
  <Link href={link} passHref>
    <Button
      as="a"
      active={active}
      color="white"
      fill="horizontal"
      hoverIndicator
      icon={icon}
      label={label}
      onClick={onClick}
      size="large"
      style={{ background: "white" }}
    />
  </Link>
)

const MainNavigation = ({ isBaseUp, onClose, show }) => (
  <Nav
    gap={isBaseUp ? "medium" : "large"}
    full="horizontal"
    alignSelf="stretch"
    pad={{ horizontal: "large" }}
  >
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
)

const Sidebar = ({ onClose, show }) => {
  const isBaseUp = useMedia("base")
  const { pathname } = useRouter()
  return (
    <Box>
      <AnimatePresence>
        {show && (
          <Layer
            animation="none"
            elevation="medium"
            full="vertical"
            modal={false}
            onClickOutside={onClose}
            onEsc={onClose}
            position="right"
            style={{ background: "transparent" }}
          >
            <motion.div
              animate={show ? "visible" : "hidden"}
              exit="hidden"
              initial={show ? "hidden" : "visible"}
              style={{ height: "100%" }}
              variants={isBaseUp ? slideMenuAnimation : circleMenuAnimation}
            >
              <GradientBackground
                header={
                  <Button
                    a11yTitle="close menu"
                    alignSelf="end"
                    hoverIndicator
                    icon={<Close />}
                    onClick={onClose}
                  />
                }
                align="center"
                footer={<SidebarFooter />}
                full="vertical"
              >
                <MainNavigation
                  isBaseUp={isBaseUp}
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
  )
}

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
}

export default Sidebar
