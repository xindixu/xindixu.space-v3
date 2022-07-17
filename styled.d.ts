import "styled-components"
import { ThemeType } from "grommet"
// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {
    dark: boolean
  }
}
