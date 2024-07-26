import Document, { Head, Html, Main, NextScript } from 'next/document';

// Import Script from 'next/script';
import { createGetInitialProps } from '@mantine/next';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      // !overflow-y-visible needed to override default styles from Privy, that hides scrollbar resulting in layout shift
      <Html lang="en" className="!overflow-y-visible scroll-smooth">
        <Head />
        <body className="bg-gradient-to-l from-[#141317] to-[#121216] min-h-screen">
          <Main />
          <NextScript />
          {/* <Script
            strategy="beforeInteractive"
            src="https://unpkg.com/@ungap/custom-elements-builtin"
          />
          <Script
            strategy="beforeInteractive"
            type="module"
            src="https://unpkg.com/x-frame-bypass"
          /> */}
        </body>
      </Html>
    );
  }
}
