import { breakpoints } from "./media-query"
import { DARK, LIGHT } from "lib/style-settings"

export const getSize = (size) => {
  const [number] = size.match(/\d+/g)
  return parseInt(number, 10)
}

export const isScreenUp = ({ base, current } = {}) => {
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

export const isDarkMode = (d) => {
  if (!d) {
    return false
  }
  const el = d.getElementsByTagName("html")[0]
  return el?.dataset?.theme === DARK
}

export const color =
  (colorName) =>
  ({ theme }) => {
    const mode = theme.dark ? DARK : LIGHT
    const { colors } = theme.global
    return colors?.[colorName]?.[mode]
  }
