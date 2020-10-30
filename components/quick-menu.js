import React from "react";
import PropTypes from "prop-types";
import { Button } from "grommet";
import { Close } from "grommet-icons";
import styled from "styled-components";

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
`;

const MainButton = styled(Button)`
  position: absolute;
  top: 40%;
  left: 60%;
  margin: -${spacerBase};
`;

const SubButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -${spacerBase};
  ${({ count, index, cycle }) => {
    const angle = 90 / count;
    const rotation = angle * (index + count * (cycle - 1) + 0.5);
    return `
      transform: rotate(${rotation}deg) translate(${radius}) rotate(-${rotation}deg);
    `;
  }}
`;

const QuickMenu = ({ subMenu }) => {
  return (
    <div>
      <Circle>
        <MainButton icon={<Close />} primary />

        {subMenu.map(({ name, link, icon }, index) => (
          <SubButton
            key={name}
            cycle={4}
            count={subMenu.length}
            index={index}
            icon={icon}
            href={link}
            primary
          />
        ))}
      </Circle>
    </div>
  );
};

QuickMenu.propTypes = {};

export default QuickMenu;
