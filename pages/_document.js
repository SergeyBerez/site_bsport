import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-PPG2W13CTS"
          ></script>
          <script>
            if (typeof window !== "undefined")
            {(window.dataLayer = window.dataLayer || [])(function gtag() {
              dataLayer.push(arguments);
            })(gtag("js", new Date()))(gtag("config", "G-PPG2W13CTS"))}
          </script>
          <link
            href="https://cdn.ans-media.com/assets/front/ans/9.22.2-ans/static/media/euclid-circular-a-bold-web-xl.woff2"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
