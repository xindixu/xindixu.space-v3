import {
  css,
  SimpleInterpolation,
  CSSObject,
  FlattenSimpleInterpolation,
} from "styled-components"

import { fontRoot } from "./constants"

export const breakpoints = {
  xxs: 320,
  xs: 480,
  sm: 600,
  base: 768,
  md: 960,
  lg: 1024,
  xl: 1440,
  xxl: 1680,
}

export type TBreakpointsKeys = keyof typeof breakpoints
export type TBreakpoints = {
  [key in TBreakpointsKeys]: number
}
export type TMediaKeys = `${TBreakpointsKeys}Up`
export type TMedia = {
  [key in TMediaKeys]: (
    first: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => FlattenSimpleInterpolation
}

export const mediaQuery = {
  screenXxsAndUp: `screen and (min-width: ${breakpoints.xxs}px)`,
  screenXsAndUp: `screen and (min-width: ${breakpoints.xs}px)`,
  screenSmAndUp: `screen and (min-width: ${breakpoints.sm}px)`,
  screenBaseAndUp: `screen and (min-width: ${breakpoints.base}px)`,
  screenMdAndUp: `screen and (min-width: ${breakpoints.md}px)`,
  screenLgAndUp: `screen and (min-width: ${breakpoints.lg}px)`,
  screenXlAndUp: `screen and (min-width: ${breakpoints.xl}px)`,
  screenXxlAndUp: `screen and (min-width: ${breakpoints.xxl}px)`,
}

// iterate through the breakpoints and create a media template
export const media: TMedia = (
  Object.keys(breakpoints) as TBreakpointsKeys[]
).reduce((memo: TMedia, label: TBreakpointsKeys) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSizeUp = (breakpoints[label] + 1) / fontRoot

  memo[`${label}Up` as TMediaKeys] = (first, ...args) => css`
    @media screen and (min-width: ${emSizeUp}em) {
      ${css(first, ...args)};
    }
  `
  return memo
}, {} as TMedia)
