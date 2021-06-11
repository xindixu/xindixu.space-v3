import { defaultProps } from "grommet"
import spacer from "./spacer"
import fontSize from "./font-size"
import color from "./color"

const { theme } = defaultProps

const styleSettings = {
  ...theme.global,
  ...color,
  ...spacer,
  ...fontSize,
  readable: "1440px",
}

export default styleSettings
export { breakpoints } from "./media-query"
export { mediaQuery } from "./media-query"
