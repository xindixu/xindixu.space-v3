import { defaultProps } from "grommet"
import spacer from "./spacer"
import color from "./color"
import getDerived from "./derived"

const { theme } = defaultProps

export const derived = getDerived(theme)

const styleSettings = {
  ...theme.global,
  ...color,
  ...spacer,
}

export default styleSettings
export { breakpoints } from "./media-query"
export { mediaQuery } from "./media-query"
