import { DefaultTheme } from "styled-components"
import { fontRoot } from "./constants"
import { breakpoints, TBreakpointsKeys } from "./media-query"

import colors from "./colors"

type TBreakpoints = {
  [key in TBreakpointsKeys]: { value: number }
}
const parsedBreakpoints = Object.entries(breakpoints).reduce(
  (memo, [key, value]) => {
    memo[key as TBreakpointsKeys] = { value }
    return memo
  },
  {} as TBreakpoints
)

const customTheme: DefaultTheme = {
  heading: {
    font: {
      family: "'Sansita Swashed', cursive",
    },
    level: {
      1: {
        font: { family: "'Dancing Script', cursive", weight: 400 },
      },
    },
  },
  global: {
    colors,
    font: {
      size: `${fontRoot}px`,
      family: "'Lato', sans-serif",
    },
    breakpoints: parsedBreakpoints,
  },
  dark: true,
}

export default customTheme
