import React from "react"
import { Box, Heading, Stack } from "grommet"
import Image from "next/image"
import { useViewportScroll, motion, useTransform } from "framer-motion"
import styled, { css } from "styled-components"
import styleSettings from "lib/style-settings"
import { media } from "lib/style-settings/media-query"

const {
  pink,
  "accent-4": beige,
  white,
  spacerXs,
  spacerSm,
  size: { large, medium },
} = styleSettings

const Gradient = styled(Box)`
  background: radial-gradient(circle, ${white}00 60%, ${pink}60 100%);
`
const Content = styled(Box)`
  width: ${medium};
  height: ${medium};

  ${media.mdUp`
    width: ${large};
    height: ${large};
  `}

  background: radial-gradient(circle, ${white}55 80%, ${white} 100%);
`

const Label = styled(Box)`
  background: ${beige};
  margin: ${spacerXs} ${spacerSm};
`

const Wrapper = styled(Stack)`
  ${({ full }) => css`
    height: ${full ? "100vh" : "50vh"};
    width: 100vw;
    overflow: hidden;
  `}
`

const Header = React.forwardRef(
  ({ name, background: { src, alt }, full, labels }, ref) => {
    const size = full
      ? { height: "100vh", width: "100vw" }
      : { height: "50vh", width: "100vw" }

    const { scrollY } = useViewportScroll()
    const backgroundY = useTransform(
      scrollY,
      [0, 400],
      full ? [0, 200] : [0, 100]
    )
    const titleY = useTransform(scrollY, [0, 400], full ? [0, 300] : [0, 150])

    return (
      <Wrapper anchor="center" full={full}>
        <motion.div style={{ y: backgroundY, x: 0 }}>
          <Box {...size} ref={ref}>
            <Image
              src={src}
              layout="fill"
              priority
              objectFit="cover"
              alt={alt}
            />
          </Box>
        </motion.div>
        <Gradient {...size} />
        <motion.div style={{ y: titleY, x: 0 }}>
          <Content align="center" justify="center">
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
        </motion.div>
      </Wrapper>
    )
  }
)

export default Header
