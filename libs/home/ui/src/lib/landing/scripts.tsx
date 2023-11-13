import Script from 'next/script';

const LandingScripts = () => (
  <>
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-CNCRXESQM1"
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', 'G-CNCRXESQM1');
			`}
    </Script>
  </>
);

export default LandingScripts;
