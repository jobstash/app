import Document, { Head, Html, Main, NextScript } from 'next/document';

import { createGetInitialProps } from '@mantine/next';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-gradient-to-l from-[#141317] to-[#121216]">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}