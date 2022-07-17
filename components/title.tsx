import React from "react"
import Head from "next/head"

type TProps = {
  name: string
}
const Title = ({ name }: TProps) => (
  <Head>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicon/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon/favicon-16x16.png"
    />
    <link rel="manifest" href="/favicon/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/favicon/safari-pinned-tab.svg"
      color="#e2b4bd"
    />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#e2b4bd" />
    <title>{name} | XindiXu.space</title>
  </Head>
)

export default Title
