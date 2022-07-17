import * as colorNames from "./color-names"

const colors = {
  [colorNames.BLACK]: "#000000",
  [colorNames.WHITE]: "#FFFFFF",
  [colorNames.BEIGE]: {
    dark: "#FFEADA",
    light: "#FFE8D6",
  },
  [colorNames.PINK]: {
    dark: "#EbCBD1",
    light: "#E2B4BD",
  },
  brand: {
    dark: "#EbCBD1",
    light: "#E2B4BD",
  },
  [colorNames.BACKGROUND]: {
    dark: "#111111",
    light: "#FFFFFF",
  },
  [colorNames.BACKGROUND_FRONT]: {
    dark: "#232020",
    light: "#FCF8F2",
  },
  text: {
    dark: "#F8F8F8", // light-1
    light: "#333333", // dark-1
  },
  [colorNames.TEXT_STRONG]: {
    dark: "#FFFFFF",
    light: "#000000",
  },
  "text-weak": {
    dark: "#EDEDED", // light-3
    light: "#777777", // dark-3
  },
  border: {
    dark: "#444444",
    light: "#CCCCCC",
  },
  control: "brand",
  // "active-background": "background-contrast",
  // "active-text": "text-strong",
  // "selected-background": "brand",
  // "selected-text": "text-strong",
  "status-critical": "#FD8A7D",
  "status-warning": "#FFD0AF",
  "status-ok": "#82B5A7",
  "status-unknown": "#CCCCCC",
  "status-disabled": "#CCCCCC",
  "graph-0": "brand",
  focus: {
    dark: "#F3E8EE",
    light: "#99869F",
  },
}

export default colors
