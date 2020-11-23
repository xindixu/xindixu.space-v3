import React from "react"
import { Box, Heading, Stack } from "grommet"
import Image from "next/image"
import styled from "styled-components"
import styleSettings from "lib/style-settings"

const {
  pink,
  "accent-4": beige,
  white,
  spacerXs,
  spacerSm,
  size: { large },
} = styleSettings

const Gradient = styled(Box)`
  background: radial-gradient(circle, ${white}00 60%, ${pink}60 100%);
`

const Content = styled(Box)`
  ${({ full }) => `
    width: ${large};
    height: ${full ? large : `calc(${large} / 1.5)`};
    background: radial-gradient(circle, ${white}55 20%, ${white} 100%);`}
`

const Label = styled(Box)`
  background: ${beige};
  margin: ${spacerXs} ${spacerSm};
`

const Header = React.forwardRef(
  ({ name, background: { src, width, height }, full, labels }, ref) => {
    const fill = full ? { fill: true } : { fill: "horizontal" }

    const size = full
      ? { height: "100vh", width: "100vw" }
      : { height: "50vh", width: "100vw" }

    return (
      <Stack anchor="center" {...fill} {...size}>
        <Box {...fill} {...size} ref={ref}>
          <Image src={src} layout="fill" priority objectFit="cover" />
        </Box>
        <Gradient {...size} />
        <Content full={full} align="center" justify="center">
          <Heading
            color="black"
            size={full ? "xlarge" : "medium"}
            textAlign="center"
          >
            {name}
          </Heading>
          <Box direction="row" wrap justify="center">
            {labels &&
              labels.map((label) => (
                <Label key={label} pad={{ horizontal: "small" }} round>
                  {label}
                </Label>
              ))}
          </Box>
        </Content>
      </Stack>
    )
  }
)

export default Header
