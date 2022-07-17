import React from "react"
import { Box, Heading, Stack } from "grommet"
import Image from "next/image"
import { useScroll, motion, useTransform } from "framer-motion"
import styled, { css } from "styled-components"
import { useTheme } from "next-themes"
import styleSettings, { DARK } from "lib/style-settings"
import { media } from "lib/style-settings/media-query"
import { color } from "lib/style-settings/utils"

const {
  PINK,
  BACKGROUND_FRONT,
  BACKGROUND,
  spacerXs,
  spacerSm,
  size: { large, medium } = {},
} = styleSettings

const Gradient = styled(Box)`
  background: radial-gradient(
    circle,
    ${color(BACKGROUND)}00 60%,
    ${color(PINK)}60 100%
  );
`

const Darken = styled(Box)`
  background: ${color(BACKGROUND)}50;
`
const Content = styled(Box)`
  width: ${medium};
  height: ${medium};

  ${media.mdUp`
    width: ${large};
    height: ${large};
  `}
`

const Label = styled(Box)`
  background: ${color(BACKGROUND_FRONT)};
  margin: ${spacerXs} ${spacerSm};
`

const Wrapper = styled(Stack)<{ full: boolean }>`
  ${({ full }) => css`
    height: ${full ? "100vh" : "50vh"};
    width: 100vw;
    overflow: hidden;

    ${full
      ? css`
          img {
            filter: blur(2px);
          }
        `
      : ""}
  `}
`

type TSrc = { src: string }
type TThemedSrc = { lightSrc: string; darkSrc: string }
type TSrcs = TSrc | TThemedSrc

type TProps = {
  name: string
  background: {
    alt?: string
  } & TSrcs
  full: boolean
  labels?: string[]
  setHeaderRef: (node?: Element | null | undefined) => void
}

const Header = ({
  name,
  background: { alt, ...srcs },
  full,
  labels,
  setHeaderRef,
}: TProps) => {
  const size = full
    ? { height: "100vh", width: "100vw" }
    : { height: "50vh", width: "100vw" }

  const { scrollY } = useScroll()
  const backgroundY = useTransform(
    scrollY,
    [0, 400],
    full ? [0, 200] : [0, 100]
  )
  const titleY = useTransform(scrollY, [0, 400], full ? [0, 300] : [0, 150])
  const { resolvedTheme } = useTheme()

  const src = srcs.hasOwnProperty("src")
    ? (srcs as TSrc).src
    : resolvedTheme === DARK
    ? (srcs as TThemedSrc).darkSrc
    : (srcs as TThemedSrc).lightSrc

  return (
    <Wrapper anchor="center" full={full}>
      <motion.div style={{ y: backgroundY, x: 0 }}>
        <Box {...size} ref={setHeaderRef}>
          <Image src={src} layout="fill" priority objectFit="cover" alt={alt} />
        </Box>
      </motion.div>
      {full || <Darken {...size} />}
      <Gradient {...size} />
      <motion.div style={{ y: titleY, x: 0 }}>
        <Content align="center" justify="center">
          <Heading size={full ? "xlarge" : "medium"} textAlign="center">
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

export default Header
