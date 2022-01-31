import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <link href="../public/fonts/EuclidCircularA-Light.woff2" rel="stylesheet" />
          <link href="../public/fonts/LabGrotesque-Light.woff2" rel="stylesheet" /> */}
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
