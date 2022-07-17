import React from "react"
import { Button, Box } from "grommet"
import styled from "styled-components"
import { Github, Monitor } from "grommet-icons"
import { AnimatePresence, motion } from "framer-motion"
import styleSettings from "lib/style-settings/index"
import { color } from "lib/style-settings/utils"

const {
  BEIGE,
  borderSize: { xlarge } = {},
  elevation: { light } = {},
} = styleSettings

const IconButton = styled(Button)`
  border-radius: ${xlarge};
  box-shadow: ${light?.medium};
  background: ${color(BEIGE)};
`

const mainIconAnimation = {
  hidden: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.5 + index * 0.1,
    },
  }),
}

type TProps = {
  demoLink: string
  horizontal: boolean
  repoLink: string
  show: boolean
}

const InfoBox = ({ demoLink, horizontal, repoLink, show }: TProps) => {
  const links = [
    {
      name: "Demo",
      link: demoLink,
      icon: <Monitor size="small" />,
      disabled: !demoLink,
    },
    {
      name: "Repo",
      link: repoLink,
      icon: <Github size="small" />,
      disabled: !repoLink,
    },
  ]
  return (
    <Box width={horizontal ? undefined : "small"} align="end">
      <AnimatePresence>
        {show && (
          <Box
            gap="small"
            width="min-content"
            responsive={false}
            direction={horizontal ? "row" : "column"}
          >
            {links.map(({ name, link, icon, disabled }, index) => (
              <motion.div
                key={name}
                animate="visible"
                custom={index}
                exit="hidden"
                initial="hidden"
                variants={mainIconAnimation}
              >
                <IconButton
                  a11yTitle={name}
                  disabled={disabled}
                  fill
                  hoverIndicator
                  href={link}
                  icon={icon}
                  primary
                  target="_blank"
                />
              </motion.div>
            ))}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default InfoBox
