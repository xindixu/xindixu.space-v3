import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components"
import { Box, Button, Layer, Nav, Sidebar as GSidebar, Text } from "grommet"
import { Close } from "grommet-icons"
import { motion, AnimatePresence } from "framer-motion"
import styleSettings from "lib/style-settings"
import { links } from "contents/routes"
import useMedia from "hooks/use-media"
import { color } from "lib/style-settings/utils"

const { PINK, BLACK, BACKGROUND } = styleSettings

const GradientBackground = styled(GSidebar)<{ isBaseUp: boolean }>`
  ${({ isBaseUp, theme }) => `
    background: linear-gradient(
      0deg,
      ${color(BLACK)({ theme })}BB -10%,
      ${color(PINK)({ theme })}${isBaseUp ? "88" : "BB"} 90%,
      ${color(PINK)({ theme })} 100%
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
  visible: ({ index }: { index: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + 0.1 * index,
    },
  }),
  hidden: ({ index, count }: { index: number; count: number }) => ({
    opacity: 0,
    y: -10,
    transition: {
      delay: 0.1 * (count - index),
    },
  }),
}

const SidebarFooter = () => (
  <Box pad="xsmall">
    <Text color="white">
      Built with{" "}
      <span role="img" aria-label="Heart">
        ❤️
      </span>{" "}
      using{" "}
    </Text>
    <Text color="white">Next.js, Contentful, Framer Motion</Text>
  </Box>
)

const SidebarButton = ({
  active,
  icon,
  label,
  link,
  onClick,
}: {
  active: boolean
  icon: JSX.Element
  label: string
  link: string
  onClick: () => void
}) => (
  <Link href={link} passHref>
    <Button
      as="a"
      primary={!active}
      color={active ? PINK : BACKGROUND}
      fill="horizontal"
      icon={icon}
      label={label}
      onClick={onClick}
      size="large"
    />
  </Link>
)

const MainNavigation = ({
  isBaseUp,
  onClose,
  pathname,
  show,
}: {
  isBaseUp: boolean
  onClose: () => void
  pathname: string
  show: boolean
}) => (
  <Nav
    gap={isBaseUp ? "medium" : "large"}
    fill="horizontal"
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
          active={pathname === link}
          icon={icon}
          key={name}
          label={name}
          link={link}
          onClick={onClose}
        />
      </motion.div>
    ))}
  </Nav>
)

type TProps = {
  onClose: () => void
  show: boolean
}

const Sidebar = ({ onClose, show }: TProps) => {
  const isBaseUp = useMedia("base")
  const { pathname } = useRouter()
  return (
    <Box>
      <AnimatePresence>
        {show && (
          <Layer
            animation="none"
            full="vertical"
            modal
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
                fill="vertical"
                isBaseUp={isBaseUp}
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

export default Sidebar
