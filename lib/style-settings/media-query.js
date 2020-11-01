import { css } from "styled-components"

import { fontRoot } from "./theme"

export const breakpoints = {
  screenXxs: 320,
  screenXs: 480,
  screenSm: 600,
  screenBase: 768,
  screenMd: 960,
  screenLg: 1024,
  screenXl: 1440,
  screenXXl: 1680,
}

export const mediaQuery = {
  screenXxsAndUp: `screen and (min-width: ${breakpoints.screenXxs}px)`,
  screenXsAndUp: `screen and (min-width: ${breakpoints.screenXs}px)`,
  screenSmAndUp: `screen and (min-width: ${breakpoints.screenSm}px)`,
  screenBaseAndUp: `screen and (min-width: ${breakpoints.screenBase}px)`,
  screenMdAndUp: `screen and (min-width: ${breakpoints.screenMd}px)`,
  screenLgAndUp: `screen and (min-width: ${breakpoints.screenLg}px)`,
  screenXlAndUp: `screen and (min-width: ${breakpoints.screenXl}px)`,
  screenXxlAndUp: `screen and (min-width: ${breakpoints.screenXxl}px)`,
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
