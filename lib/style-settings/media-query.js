import { css } from "styled-components"

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
export const media = Object.keys(breakpoints).reduce((memo, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSizeUp = (breakpoints[label] + 1) / fontRoot

  memo[`${label}Up`] = (...args) => css`
    @media screen and (min-width: ${emSizeUp}em) {
      ${css(...args)};
    }
  `
  return memo
}, {})
