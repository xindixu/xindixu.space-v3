import { defaultProps } from "grommet"
import spacer from "./spacer"
import fontSize from "./font-size"
import * as colorNames from "./color-names"

const { theme } = defaultProps

const styleSettings = {
  ...theme.global,
  ...spacer,
  ...fontSize,
  ...colorNames,
  readable: "1440px",
}
export const LIGHT = "light"
export const DARK = "dark"
export default styleSettings
export { breakpoints } from "./media-query"
export { mediaQuery } from "./media-query"
