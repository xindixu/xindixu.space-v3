# [XindiXu.Space](https://xindixu.space)

![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=xindixu-space-v3&style=for-the-badge)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/gpl-3.0)

Xindi Xu is a Software Engineer and an incoming MSCS student at Columbia University. Checkout her experiences, past projects, and cute kitty Casper Dr. Meowspy here!

Built with Next.js with content managed by Contentful, this website optimizes loading experiences and eases future updates. It also contains many hand-crafted animations created with Framer Motion to enhance UX.

## Notable Libraries Used

|   |   |
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
  - NEXT_PUBLIC_CONTENTFUL_SPACE_ID
  - NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
  - NEXT_PUBLIC_EMAIL_USER_ID
  - NEXT_PUBLIC_EMAIL_SERVICE_ID
  - NEXT_PUBLIC_GITHUB_ACCESS_TOKEN

## To Run 
- Run `yarn dev` and web app should be available at http://localhost:3000

## To Deploy
- Push to the `main` branch should trigger an automatic rebuild in Vercel
- Add those env variables above in Vercel app settings

## Sample Build Output
```
Page                                                           Size     First Load JS
┌ ○ /                                                          168 B           349 kB
├   /_app                                                      0 B             349 kB
├ ○ /404                                                       186 B           349 kB
├ ● /casper                                                    4.54 kB         354 kB
├ ○ /contact                                                   1.98 kB         351 kB
├ ○ /experiences                                               1.69 kB         351 kB
├ λ /projects                                                  3.03 kB         352 kB
└ ● /projects/[slug]                                           15.3 kB         364 kB
    ├ /projects/our-next-branch
    ├ /projects/texas-state-capitol
    ├ /projects/enron-raptors
    └ [+22 more paths]
+ First Load JS shared by all                                  349 kB
  ├ chunks/0ae45f2eda23ec83b61be77b5a93af9f72dd9e2c.d1f444.js  9.09 kB
  ├ chunks/197f7f4aa9a9b203f2f35cecae15a0a52d538a29.84e48c.js  29.7 kB
  ├ chunks/29107295.72d742.js                                  24.6 kB
  ├ chunks/36bcf0ca.0a0147.js                                  50.3 kB
  ├ chunks/3a598c4ef1965d7fc4611cc5f799c66a1cf81aeb.e96a69.js  13.6 kB
  ├ chunks/490dbc0323d11165697adf947884d32e6742a8f3.8ed55d.js  4.53 kB
  ├ chunks/6f99514df46bcd158b2e57e54c4c8d54a41bf662.05ccfe.js  5.61 kB
  ├ chunks/71247caf95475e3ea7f9a0f8a30beb258b23d005.b8b048.js  52.7 kB
  ├ chunks/7d0196f7742c61621b1d1ab3ab6f91f4944b2d2c.0fe841.js  30.9 kB
  ├ chunks/a03329c20db0a323d2926cf53db50ea2e1ed12c0.4e749a.js  15.7 kB
  ├ chunks/b8cd623695ec97ec665a179189d5bbe179d34bad.53b08a.js  33.7 kB
  ├ chunks/c1101280e8f72a9b3bd20dea9c845d134fab6612.0a8846.js  9.7 kB
  ├ chunks/c7e9828f2fd7411ee6d66a95bb5f5b18b3719cba.bd4443.js  5.06 kB
  ├ chunks/framework.f8bd46.js                                 42.1 kB
  ├ chunks/main.b11e64.js                                      7.14 kB
  ├ chunks/pages/_app.dd7561.js                                13.9 kB
  ├ chunks/webpack.50bee0.js                                   751 B
  └ css/f7b8e90763bdbc2dc8bd.css                               1.31 kB
λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)
```