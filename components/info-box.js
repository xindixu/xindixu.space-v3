import React, { useContext } from "react"
import { Button, Box, ResponsiveContext } from "grommet"
import styled from "styled-components"
import { Github, Monitor, Previous } from "grommet-icons"
import { motion } from "framer-motion"
import styleSettings from "lib/style-settings/index"

const {
  elevation: { light },
  borderSize: { xlarge },
} = styleSettings

const IconButton = styled(Button)`
  border-radius: ${xlarge};
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

const InfoBox = ({ demoLink, repoLink }) => {
  const size = useContext(ResponsiveContext)

  const links = [
    { name: "Demo", link: demoLink, icon: <Monitor />, disabled: !demoLink },
    { name: "Repo", link: repoLink, icon: <Github />, disabled: !repoLink },
  ]
  return (
    <Box
      gap="small"
      responsive={false}
      direction={size === "large" ? "column" : "row"}
    >
      {links.map(({ name, link, icon, disabled }, index) => (
        <motion.div
          key={name}
          initial="hidden"
          animate="visible"
          variants={mainIconAnimation}
          custom={index}
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

      <motion.div
        initial="hidden"
        animate="visible"
        variants={mainIconAnimation}
        custom={2}
      >
        <IconButton
          alignSelf="end"
          a11yTitle="go back"
          fill
          hoverIndicator
          href="/projects"
          icon={<Previous />}
          primary
        />
      </motion.div>
    </Box>
  )
}

export default InfoBox
