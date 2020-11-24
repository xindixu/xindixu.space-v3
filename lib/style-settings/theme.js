export const fontRoot = 16

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
  },
}

export default customTheme
