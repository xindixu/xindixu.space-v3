import { isDarkMode } from "./utils"

const pink = {
  dark: "#EbCBD1",
  light: "#E2B4BD",
}

const green = {
  base: "#93A8AC",
  light: "#c0c0af",
  dark: "#848471",
}

const beige = {
  base: "#FFE8D6",
  dark: "#ccbaab",
  light: "#ffeada",
}

const white = "#FFFFFF"
const black = "#000000"

const colorPalette = { pink, green, beige }

const parseObject = (key, obj) => ({
  [key]: isDarkMode() ? obj.dark : obj.light,
})

const getColorShades = () =>
  Object.keys(colorPalette).reduce(
    (memo, key) => ({
      ...memo,
      ...parseObject(key, colorPalette[key]),
    }),
    {}
  )

export const colorShades = getColorShades()

const colors = {
  brand: {
    dark: "#EbCBD1",
    light: "#E2B4BD",
  },
  background: {
    dark: "#111111",
    light: "#FFFFFF",
  },
  "background-back": {
    dark: "#111111",
    light: "#EEEEEE",
  },
  "background-front": {
    dark: "#222222",
    light: "#FCF8F2",
  },
  "background-contrast": {
    dark: "#FFFFFF11",
    light: "#11111111",
  },
  text: {
    dark: "#EEEEEE",
    light: "#333333",
  },
  "text-strong": {
    dark: "#FFFFFF",
    light: "#000000",
  },
  "text-weak": {
    dark: "#CCCCCC",
    light: "#444444",
  },
  "text-xweak": {
    dark: "#999999",
    light: "#666666",
  },
  border: {
    dark: "#444444",
    light: "#CCCCCC",
  },
  control: "brand",
  "active-background": "background-contrast",
  "active-text": "text-strong",
  "selected-background": "brand",
  "selected-text": "text-strong",
  "status-critical": "#FD8A7D",
  "status-warning": "#FFD0AF",
  "status-ok": "#82B5A7",
  "status-unknown": "#CCCCCC",
  "status-disabled": "#CCCCCC",
  "graph-0": "brand",
  focus: "#FFEECA",
}

export default colors
