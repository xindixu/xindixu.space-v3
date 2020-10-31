import React from "react";
import { Box, Heading } from "grommet";
import styled from "styled-components";
import { useRouter } from "next/router";
import styleSettings from "lib/style-settings";

const { pink, white } = styleSettings;

import { linksByPathname } from "contents/routes";

const Image = styled(Box)`
  ${({ url, position }) => `
    background: url(/img${url});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: ${position || "center"};
  `}
`;

const Gradient = styled(Box)`
  background: radial-gradient(circle, ${white}00 60%, ${pink}66 100%);
`;

const Header = React.forwardRef((props, ref) => {
  const { pathname } = useRouter();

  const { name, background } = linksByPathname[pathname];
  return (
    <Image {...background} fill ref={ref}>
      <Gradient fill align="center" justify="center">
        <Heading>{name}</Heading>
      </Gradient>
    </Image>
  );
});

export default Header;
