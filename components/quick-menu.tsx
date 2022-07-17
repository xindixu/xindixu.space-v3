import React, { cloneElement, useRef } from "react"
import { useClickAway } from "react-use"
import { Button } from "grommet"
import { Close, AppsRounded } from "grommet-icons"
import styled, { useTheme } from "styled-components"
import { AnimatePresence, motion } from "framer-motion"
import styleSettings from "lib/style-settings/index"
import { links } from "contents/social-media"

const { spacerBase, elevation: { light } = {} } = styleSettings

const DIAMETER = "288px"
const RADIUS = "144px"

const Circle = styled.div`
  position: relative;
  width: ${DIAMETER};
  height: ${DIAMETER};
  margin-left: -${RADIUS};
  margin-bottom: -${RADIUS};
  padding: 0;
  border-radius: 50%;
  z-index: 0;
`

const MainButton = styled(Button)`
  position: absolute;
  bottom: 16px;
  left: 16px;
  border-radius: 50%;
  box-shadow: ${light?.medium};

  &&& {
    &:focus {
      box-shadow: ${light?.medium};
    }
  }

  z-index: 1;
`

const SubButton = styled(Button)<{
  count: number
  cycle: number
  index: number
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -${spacerBase};
  border-radius: 50%;
  box-shadow: ${light?.medium};
  ${({ count, index, cycle }) => {
    const angle = 90 / count
    const rotation = angle * (index + count * (cycle - 1) + 0.5)
    return `
      transform: rotate(${rotation}deg) translate(${RADIUS}) rotate(-${rotation}deg);
    `
  }}
`

const mainIconAnimation = {
  hidden: { rotate: 0 },
  visible: { rotate: 180 },
}

const subMenuCircleAnimation = {
  hidden: ({ index, count }: { count: number; index: number }) => ({
    translateY: RADIUS,
    rotate: -100,
    transition: {
      delay: 0.1 * (count - index),
    },
  }),
  visible: ({ index }: { index: number }) => ({
    translateY: RADIUS,
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

type TProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const QuickMenu = ({ isOpen, setIsOpen }: TProps) => {
  const theme = useTheme()
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
          <Circle>
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
                  tabIndex={isOpen ? 0 : -1}
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

export default QuickMenu
