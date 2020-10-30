import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "grommet";
import { Close } from "grommet-icons";
import styled from "styled-components";
import { motion, useAnimation, useTransform } from "framer-motion";
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
  hidden: { translateY: radius, rotate: -100 },
  visible: { translateY: radius, rotate: 0 },
};

const iconAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const QuickMenu = ({ subMenu }) => {
  const [open, setOpen] = useState(false);
  const controls = useAnimation();
  const { length: count } = subMenu;
  return (
    <div>
      <Circle>
        <MainButton
          icon={<Close />}
          primary
          hoverIndicator
          onClick={() => {
            setOpen((prevOpen) => {
              controls.start((i) => {
                const { hidden, visible } = circleAnimation;
                const animation = prevOpen ? hidden : visible;
                const delay = 0.1 * (prevOpen ? i : count - i);
                return {
                  ...animation,
                  transition: {
                    delay,
                  },
                };
              });
              return !prevOpen;
            });
          }}
        />

        {subMenu.map(({ name, link, icon }, index) => (
          <motion.div
            initial={open ? "visible" : "hidden"}
            variants={circleAnimation}
            animate={controls}
            custom={index}
          >
            <SubButton
              key={name}
              hoverIndicator
              cycle={count}
              count={count}
              index={index}
              icon={
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={iconAnimation}
                >
                  {icon}
                </motion.div>
              }
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
};

export default QuickMenu;
