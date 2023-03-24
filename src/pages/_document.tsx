import Document, { Head, Html, Main, NextScript } from 'next/document';

import { createGetInitialProps } from '@mantine/next';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-black/90 text-white/90">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
