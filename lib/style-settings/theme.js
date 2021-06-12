import { fontRoot } from "./constants"
import { breakpoints } from "./media-query"

import color from "./color"

const customTheme = {
  heading: {
    font: {
      family: "'Sansita Swashed', cursive",
    },
    level: {
      1: {
        font: { family: "'Dancing Script', cursive" },
      },
    },
  },
  global: {
    colors: color,
    font: {
      size: `${fontRoot}px`,
      family: "'Lato', sans-serif",
    },
    breakpoints: Object.entries(breakpoints).reduce((memo, [key, value]) => {
      memo[key] = { value }
      return memo
    }, {}),
  },
}

export default customTheme
