import { defaultProps } from "grommet"
import spacer from "./spacer"
import fontSize from "./font-size"
import color, { colorShades } from "./color"

const { theme } = defaultProps

const styleSettings = {
  ...theme.global,
  // ...color,
  ...colorShades,
  ...spacer,
  ...fontSize,
  readable: "1440px",
}
export const LIGHT = "light"
export const DARK = "dark"
export default styleSettings
export { breakpoints } from "./media-query"
export { mediaQuery } from "./media-query"
