const pink = {
  base: "#E2B4BD",
  light: "#ebcbd1",
  dark: "#cba2aa",
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
  [key]: obj.base,
  [`${key}Light`]: obj.light,
  [`${key}Dark`]: obj.dark,
})

const getColorShades = () =>
  Object.keys(colorPalette).reduce(
    (memo, key) => ({
      ...memo,
      ...parseObject(key, colorPalette[key]),
    }),
    {}
  )

const colorShades = getColorShades()

const color = {
  ...colorShades,
  black,
  white,
  active: "#ADB5BD",
  brand: colorShades.pink,
  background: white,
  foreground: black,
  focus: "#93A8AC",
  placeholder: "#495057",
  selected: "#424B54",
  "accent-1": colorShades.green,
  // "accent-2": "#DDBEA9",
  // "accent-3": "#B7B7A4",
  "accent-4": colorShades.beigeDark,
  "neutral-1": colorShades.greenLight,
  // "neutral-2": "#4A4E69",
  // "neutral-3": "#9A8C98",
  "neutral-4": colorShades.beigeLight,
  "status-critical": "#FFB5B5",
  "status-warning": "#F7E8A8",
  "status-ok": "#C8EB9D",
  "bg-paper": "#FCF8F2",
}

export default color
