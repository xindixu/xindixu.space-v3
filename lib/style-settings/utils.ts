import { DefaultTheme } from "styled-components"
import { DARK, LIGHT } from "lib/style-settings"
import { breakpoints, TBreakpointsKeys } from "./media-query"
import { TColorNames } from "./color-names"

export const isScreenUp = ({
  base,
  current,
}: {
  base: TBreakpointsKeys
  current: string
}) => {
  const allBreakPoints = {
    small: 768,
    medium: 1536,
    large: 1537,
    ...breakpoints,
  }
  const order = Object.entries(allBreakPoints)
    .sort((a, b) => a[1] - b[1])
    .map(([key]) => key)

  const baseIndex = order.findIndex((key) => key === base)
  const currentIndex = order.findIndex((key) => key === current)

  return currentIndex > baseIndex
}

export const color =
  (colorName: TColorNames) =>
  ({ theme }: { theme: DefaultTheme }) => {
    // @ts-expect-error
    const mode = theme.dark ? DARK : LIGHT
    // @ts-expect-error
    const { colors } = theme.global
    const selectedColor = colors?.[colorName]
    if (selectedColor && typeof selectedColor === "object") {
      return selectedColor?.[mode]
    }
    return selectedColor
  }
