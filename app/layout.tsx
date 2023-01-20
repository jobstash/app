import Script from "next/script";

function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5337133458846513"
          crossOrigin="anonymous"
        >
        </Script>
        <title>NextJs Starter App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
