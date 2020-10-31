import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { createGlobalStyle } from "styled-components";
import { Grommet } from "grommet";
import CommonLayout from "layout/common";
import customTheme from "lib/style-settings/theme";
import { linksByPathname } from "contents/routes";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();

  const { name } = linksByPathname[pathname];
  return (
    <>
      <Head>
        <title>{name} | XindiXu.space</title>
      </Head>
      <Grommet theme={customTheme} full>
        <GlobalStyle />
        <CommonLayout>
          <Component {...pageProps} />
        </CommonLayout>
      </Grommet>
    </>
  );
}
