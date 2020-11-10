import React from "react"
import { Box, Heading } from "grommet"
import styled from "styled-components"
import styleSettings from "lib/style-settings"

const {
  pink,
  "accent-4": beige,
  white,
  spacerXs,
  spacerSm,
  spacerXxl,
} = styleSettings

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

const Content = styled(Box)`
  padding: ${spacerXxl};
  background: radial-gradient(circle, ${white}55 60%, ${white} 100%);
`

const Label = styled(Box)`
  background: ${beige};
  margin: ${spacerXs} ${spacerSm};
`

const Header = React.forwardRef(({ name, background, full, labels }, ref) => (
  <Image {...background} fill={full ? true : "horizontal"} ref={ref}>
    <Gradient fill align="center" justify="center">
      <Content>
        <Heading
          color="black"
          size={full ? "xlarge" : "medium"}
          textAlign="center"
        >
          {name}
        </Heading>
        <Box direction="row" wrap>
          {labels &&
            labels.map((label) => (
              <Label key={label} pad={{ horizontal: "small" }} round>
                {label}
              </Label>
            ))}
        </Box>
      </Content>
    </Gradient>
  </Image>
))

export default Header
