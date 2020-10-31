import React from "react";
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

const Header = React.forwardRef((props, ref) => {
  const { pathname } = useRouter();

  const { name, background } = linksByPathname[pathname];
  return (
    <Image {...background} fill align="center" justify="center" ref={ref}>
      <Heading>{name}</Heading>
    </Image>
  );
});

export default Header;
