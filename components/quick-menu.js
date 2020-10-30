import React from "react";
import PropTypes from "prop-types";
import { Button } from "grommet";
import { Close, AppsRounded } from "grommet-icons";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import styleSettings from "lib/style-settings/index";

const { spacerBase } = styleSettings;

const diameter = "288px";
const radius = "144px";
const Circle = styled.div`
  position: relative;
  width: ${diameter};
  height: ${diameter};
  margin-left: -${radius};
  margin-bottom: -${radius};
  padding: 0;
  border-radius: 50%;
  z-index: 0;
`;

const MainButton = styled(Button)`
  position: absolute;
  top: 40%;
  left: 60%;
  margin: -${spacerBase};
  border-radius: 50%;
`;

const SubButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -${spacerBase};
  border-radius: 50%;
  ${({ count, index, cycle }) => {
    const angle = 90 / count;
    const rotation = angle * (index + count * (cycle - 1) + 0.5);
    return `
      transform: rotate(${rotation}deg) translate(${radius}) rotate(-${rotation}deg);
    `;
  }}
`;

const circleAnimation = {
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
      staggerChildren: 0.01 * index,
      delay: 0.1 * index,
    },
  }),
};

const mainIconAnimation = {
  hidden: { rotate: 0 },
  visible: { rotate: 180 },
};

const subIconAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const QuickMenu = ({ subMenu, isOpen, setIsOpen }) => {
  const { length: count } = subMenu;
  return (
    <div>
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
            setIsOpen((prevIsOpen) => !prevIsOpen);
          }}
        />
        {subMenu.map(({ name, link, icon }, index) => (
          <motion.div
            key={name}
            initial={isOpen ? "hidden" : false}
            animate={isOpen ? "visible" : "hidden"}
            variants={circleAnimation}
            custom={{ index, count }}
          >
            <SubButton
              hoverIndicator
              cycle={count}
              count={count}
              index={index}
              icon={<motion.div variants={subIconAnimation}>{icon}</motion.div>}
              href={link}
              primary
            />
          </motion.div>
        ))}
      </Circle>
    </div>
  );
};

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
};

export default QuickMenu;
