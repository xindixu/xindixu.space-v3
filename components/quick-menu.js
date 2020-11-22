import React from "react"
import PropTypes from "prop-types"
import { Button } from "grommet"
import { Close, AppsRounded } from "grommet-icons"
import styled from "styled-components"
import { motion } from "framer-motion"
import styleSettings from "lib/style-settings/index"

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
  top: 40%;
  left: 60%;
  margin: -${spacerBase};
  border-radius: 50%;
  box-shadow: ${light.medium};
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
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const QuickMenu = ({ subMenu, isOpen, setIsOpen }) => {
  const { length: count } = subMenu
  return (
    <Circle>
      <MainButton
        icon={
          <motion.div
            initial={isOpen ? "hidden" : false}
            animate={isOpen ? "visible" : "hidden"}
            variants={mainIconAnimation}
          >
            {isOpen ? <Close /> : <AppsRounded />}
          </motion.div>
        }
        primary
        hoverIndicator
        onClick={() => {
          setIsOpen((prevIsOpen) => !prevIsOpen)
        }}
      />
      {subMenu.map(({ name, link, icon }, index) => (
        <motion.div
          key={name}
          initial={isOpen ? "hidden" : false}
          animate={isOpen ? "visible" : "hidden"}
          variants={subMenuCircleAnimation}
          custom={{ index, count }}
        >
          <SubButton
            count={count}
            cycle={count}
            hoverIndicator
            href={link}
            icon={<motion.div variants={subIconAnimation}>{icon}</motion.div>}
            index={index}
            primary
            tabIndex={isOpen - 1}
            target="_blank"
          />
        </motion.div>
      ))}
    </Circle>
  )
}

QuickMenu.propTypes = {
  subMenu: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    }).isRequired
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default QuickMenu
