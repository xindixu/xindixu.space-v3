# [XindiXu.Space](https://xindixu.space)

![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=xindixu-space-v3&style=for-the-badge)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/gpl-3.0)

Xindi Xu is a Software Engineer and a Master of Science in Computer Science student at Columbia University. Checkout her experiences, past projects, and cute kitty Casper Dr. Meowspy here!

Built with Next.js with content managed by Contentful, this website optimizes loading experiences and eases future updates. It also contains many hand-crafted animations created with Framer Motion to enhance UX.

## Notable Tools/Libraries Used

| Tool/Library | Description |
|---|---|
| [Next.js](https://nextjs.org) | Static site generation & server-side rendering |
| [React.js](https://reactjs.org) | Declarative way to build UIs efficiently |
| [Styled components](https://styled-components.com) | Better CSS styling for React component systems |
| [Grommet](https://v2.grommet.io) | Styled-component-based framework that provides accessibility, modularity, responsiveness, and theming |
| [Framer motion](https://www.framer.com/motion/) | Production-ready animation and gesture library for React |
| [Octokit](https://github.com/octokit) | Official clients for the GitHub API |
| [Chart.js](https://github.com/reactchartjs/react-chartjs-2) | React wrapper for [Chart.js](https://www.chartjs.org), a simple yet flexible JavaScript charting library |
| [Contentful](https://www.contentful.com) | Modern CMS that provides content infrastructure for modern web apps  |
| [Emailjs](https://www.emailjs.com) | Send email directly from JavaScript without any server code |
| [Vercel](https://vercel.com) | Deployment services that combines the best developer experience with an obsessive focus on end-user performance |

## To Set Up
- Run `yarn install`
- Create a .env.local file and add these variables:
  - `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`
  - `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`
  - `NEXT_PUBLIC_EMAIL_USER_ID`
  - `NEXT_PUBLIC_EMAIL_SERVICE_ID`
  - `NEXT_PUBLIC_GITHUB_ACCESS_TOKEN`

## To Run 
- Run `yarn dev` and web app should be available at http://localhost:3000

## To Deploy
- Push to the `main` branch should trigger an automatic rebuild in Vercel
- Add those env variables above in Vercel app settings

## Sample Build Output
```
yarn run v1.22.18
$ next build
info  - Loaded env from .env.local
info  - Linting and checking validity of types
info  - Disabled SWC as replacement for Babel because of custom Babel configuration ".babelrc" https://nextjs.org/docs/messages/swc-disabled
info  - Using external babel configuration from .babelrc
info  - Creating an optimized production build
info  - Compiled successfully
info  - Collecting page data
info  - Generating static pages (34/34)
info  - Finalizing page optimization

Page                                                                Size     First Load JS
┌ ○ / (1354 ms)                                                     10 kB           186 kB
├   /_app                                                           0 B             166 kB
├ ○ /404 (2441 ms)                                                  227 B           167 kB
├ ● /casper (1222 ms)                                               1.73 kB         168 kB
├ ○ /contact (2282 ms)                                              2.08 kB         168 kB
├ ○ /experiences (846 ms)                                           5.97 kB         172 kB
├   └ css/38b362ae65d5686f.css                                      1.29 kB
├ λ /projects                                                       65.4 kB         269 kB
└ ● /projects/[slug] (16855 ms)                                     17 kB           221 kB
    ├ /projects/user-experience-accessibility-animations (2221 ms)
    ├ /projects/complaza (2034 ms)
    ├ /projects/mailit (2025 ms)
    ├ /projects/texas-state-capitol (1784 ms)
    ├ /projects/reservation-system (1767 ms)
    ├ /projects/calendar (970 ms)
    ├ /projects/texas-central-star (779 ms)
    └ [+21 more paths]
+ First Load JS shared by all                                       166 kB
  ├ chunks/framework-4556c45dd113b893.js                            45.2 kB
  ├ chunks/main-daa4f2056e4719ac.js                                 29.1 kB
  ├ chunks/pages/_app-483bfe0e380ac51d.js                           89.9 kB
  └ chunks/webpack-13cedcbda4ff7a6c.js                              2.05 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)

✨  Done in 29.96s.
```

## TypeScript Migration
### Guides
- Contentful: [Guide](https://www.contentful.com/developers/docs/javascript/tutorials/typescript-in-javascript-client-library), [TS type generation app](https://github.com/marcolink/cf-content-types-generator-app)
- Next.js: [Guide](https://nextjs.org/docs/basic-features/typescript#existing-projects) 
- Styled-Components: [Guide](https://styled-components.com/docs/api#typescript)
- TS-migrate: [GitHub](https://github.com/airbnb/ts-migrate)

1. Install `typescript` globally and `tsc --init`
3. Update `baseUrl` in `tsconfig.json`
4. Install `@type/..` for 3rd party libraries
5. Update npm packages for TypeScript support
6. Use `ts-migrate` to migrate incrementally
7. Declare global type interfaces `**.d.ts`
8. Update `eslint` settings