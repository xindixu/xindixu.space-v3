import React from "react";
import PropTypes from "prop-types";
import { Box, Heading } from "grommet";
import { useRouter } from "next/router";
import Image from "next/image";
import { linksByPathname } from "contents/routes";

const Header = (props) => {
  const { pathname } = useRouter();

  const { name, background } = linksByPathname[pathname];
  return (
    <Box fill align="center" justify="center">
      <Image
        src={`/img${background}`}
        alt=""
        width={1400}
        height={960}
        priority
      />
      <Heading>{name}</Heading>
    </Box>
  );
};

Header.propTypes = {};

export default Header;
