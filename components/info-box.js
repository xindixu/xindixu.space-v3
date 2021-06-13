import React from "react"
import { Button, Box } from "grommet"
import styled from "styled-components"
import { Github, Monitor, Previous } from "grommet-icons"
import { AnimatePresence, motion } from "framer-motion"
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

const InfoBox = ({ demoLink, repoLink, show }) => {
  const links = [
    { name: "Demo", link: demoLink, icon: <Monitor />, disabled: !demoLink },
    { name: "Repo", link: repoLink, icon: <Github />, disabled: !repoLink },
  ]
  return (
    <Box width="small" align="end">
      <AnimatePresence>
        {show && (
          <Box
            gap="small"
            width="min-content"
            responsive={false}
            direction="column"
          >
            {links.map(({ name, link, icon, disabled }, index) => (
              <motion.div
                key={name}
                animate="visible"
                custom={index}
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
