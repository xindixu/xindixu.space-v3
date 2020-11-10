import React from "react"
import { Button, Box } from "grommet"
import styled from "styled-components"
import { Github, Monitor, Contact } from "grommet-icons"
import { motion } from "framer-motion"
import styleSettings from "lib/style-settings/index"

const {
  elevation: { light },
} = styleSettings

const IconButton = styled(Button)`
  border-radius: 50%;
  box-shadow: ${light.medium};
`

const mainIconAnimation = {
  hidden: { scale: 0 },
  visible: (index) => ({
    scale: 1,
    transition: {
      delay: 0.5 + index * 0.1,
    },
  }),
}

const Index = ({ demoLink, repoLink }) => {
  const links = [
    { name: "Demo", link: demoLink, icon: <Monitor /> },
    { name: "Repo", link: repoLink, icon: <Github /> },
    // { name: "Comments", link: demoLink, icon: <Contact /> },
  ]
  return (
    <Box gap="small" responsive={false}>
      {links.map(({ name, link, icon }, index) => (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={mainIconAnimation}
          custom={index}
        >
          <IconButton
            fill
            href={link}
            a11yTitle={name}
            primary
            target="_blank"
            icon={icon}
            hoverIndicator
          />
        </motion.div>
      ))}
    </Box>
  )
}

export default Index
