import { fontRoot } from "./constants"
import { breakpoints } from "./media-query"

import colors from "./colors"

const customTheme = {
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
    breakpoints: Object.entries(breakpoints).reduce((memo, [key, value]) => {
      memo[key] = { value }
      return memo
    }, {}),
  },
}

export default customTheme
