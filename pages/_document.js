import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://cdn.ans-media.com/assets/front/ans/9.22.2-ans/static/media/euclid-circular-a-bold-web-xl.woff2"
            rel="stylesheet"
          />
          <link
            href="../public/fonts/EuclidCircularA-Light.woff2"
            rel="stylesheet"
          />
          <link
            href="../public/fonts/LabGrotesque-Light.woff2"
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
