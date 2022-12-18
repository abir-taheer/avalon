import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body className={"mdc-typography mdc-theme--background"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
