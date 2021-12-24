import React, { cloneElement, useRef } from "react"
import PropTypes from "prop-types"
import { useClickAway } from "react-use"
import { Button } from "grommet"
import { Close, AppsRounded } from "grommet-icons"
import styled, { withTheme } from "styled-components"
import { AnimatePresence, motion } from "framer-motion"
import styleSettings from "lib/style-settings/index"
import { links } from "contents/social-media"

const {
  spacerBase,
  elevation: { light },
} = styleSettings

const diameter = "288px"
const radius = "144px"
const Circle = styled.div`
  position: relative;
  width: ${diameter};
  height: ${diameter};
  margin-left: -${radius};
  margin-bottom: -${radius};
  padding: 0;
  border-radius: 50%;
  z-index: 0;
`

const MainButton = styled(Button)`
  position: absolute;
  bottom: 16px;
  left: 16px;
  border-radius: 50%;
  box-shadow: ${light.medium};

  &&& {
    &:focus {
      box-shadow: ${light.medium};
    }
  }

  z-index: 1;
`

const SubButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -${spacerBase};
  border-radius: 50%;
  box-shadow: ${light.medium};
  ${({ count, index, cycle }) => {
    const angle = 90 / count
    const rotation = angle * (index + count * (cycle - 1) + 0.5)
    return `
      transform: rotate(${rotation}deg) translate(${radius}) rotate(-${rotation}deg);
    `
  }}
`

const mainIconAnimation = {
  hidden: { rotate: 0 },
  visible: { rotate: 180 },
}

const subMenuCircleAnimation = {
  hidden: ({ index, count }) => ({
    translateY: radius,
    rotate: -100,
    transition: {
      delay: 0.1 * (count - index),
    },
  }),
  visible: ({ index }) => ({
    translateY: radius,
    rotate: 0,
    transition: {
      when: "beforeChildren",
      delay: 0.1 * index,
    },
  }),
}

const subIconAnimation = {
  hidden: { scale: 0, transition: { duration: 0.2 } },
  visible: { scale: 1, transition: { duration: 0.1 } },
}

const QuickMenu = ({ isOpen, setIsOpen, theme }) => {
  const { length: count } = links
  const ref = useRef(null)

  const iconColor = theme.dark ? "dark-2" : "dark-3"
  const buttonColor = theme.dark ? "text-weak" : "background"
  useClickAway(ref, () => {
    if (isOpen) {
      setIsOpen(false)
    }
  })

  return (
    <>
      <MainButton
        a11yTitle={`${isOpen ? "close" : "open"} sub-menu`}
        active={false}
        icon={
          <motion.div
            initial={isOpen ? "hidden" : false}
            animate={isOpen ? "visible" : "hidden"}
            variants={mainIconAnimation}
          >
            {isOpen ? (
              <Close color={iconColor} />
            ) : (
              <AppsRounded color={iconColor} />
            )}
          </motion.div>
        }
        hoverIndicator={buttonColor}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        primary
        ref={ref}
      />
      <AnimatePresence>
        {isOpen && (
          <Circle isOpen={isOpen}>
            {links.map(({ name, link, icon }, index) => (
              <motion.div
                key={name}
                animate="visible"
                custom={{ index, count }}
                exit="hidden"
                initial="hidden"
                variants={subMenuCircleAnimation}
              >
                <SubButton
                  a11yTitle={name}
                  count={count}
                  cycle={count}
                  href={link}
                  icon={
                    <motion.div variants={subIconAnimation}>
                      {cloneElement(icon, { color: iconColor })}
                    </motion.div>
                  }
                  hoverIndicator={buttonColor}
                  index={index}
                  primary
                  tabIndex={isOpen - 1}
                  target="_blank"
                />
              </motion.div>
            ))}
          </Circle>
        )}
      </AnimatePresence>
    </>
  )
}

QuickMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default withTheme(QuickMenu)
