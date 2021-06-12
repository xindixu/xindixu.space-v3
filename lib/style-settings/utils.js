import { breakpoints } from "./media-query"

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
