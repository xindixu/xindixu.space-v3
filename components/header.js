import React from "react";
import PropTypes from "prop-types";
import { Box, Heading } from "grommet";
import styled from "styled-components";
import { useRouter } from "next/router";

import { linksByPathname } from "contents/routes";

const Image = styled(Box)`
  height: 100%;
  width: 100%;

  ${({ url, position }) => `
    background: url(/img${url});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: ${position || "center"};
  `}
`;

const Header = (props) => {
  const { pathname } = useRouter();

  const { name, background } = linksByPathname[pathname];
  return (
    <Box fill align="center" justify="center">
      <Image {...background} fill>
        <Heading>{name}</Heading>
      </Image>
    </Box>
  );
};

Header.propTypes = {};

export default Header;
