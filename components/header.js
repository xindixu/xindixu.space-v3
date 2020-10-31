import React from "react"
import { Box, Heading } from "grommet"
import styled from "styled-components"
import styleSettings from "lib/style-settings"

const { pink, white, spacerXxl } = styleSettings

const Image = styled(Box)`
  ${({ url, position = "center" }) => `
    background: url(${url});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: ${position};
  `}
`

const Gradient = styled(Box)`
  background: radial-gradient(circle, ${white}00 60%, ${pink}66 100%);
`

const Text = styled(Box)`
  padding: ${spacerXxl};
  background: radial-gradient(circle, ${white}55 60%, ${white} 100%);
`

const Header = React.forwardRef(({ name, background, full }, ref) => {
  return (
    <Image {...background} fill={full ? true : "horizontal"} ref={ref}>
      <Gradient fill align="center" justify="center">
        <Text>
          <Heading color="black" size={full ? "xlarge" : "medium"}>
            {name}
          </Heading>
        </Text>
      </Gradient>
    </Image>
  )
})

export default Header
