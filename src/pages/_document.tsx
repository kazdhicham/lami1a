import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#2296f3" />
        <meta name="title" content="lami1a - shoping - selections " />
        <meta
          name="description"
          content="Shopping ."
        />
        <meta
          name="keywords"
          content="shopping selections groups "
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lami1a.com/" />
        <meta property="og:site_name" content="lami1a.com" />

        <meta property="og:title" content="Lami1a plateforme to share slections" />
        <meta
          property="og:description"
          content="Lami1a plateforme to share slections"
        />
        <meta property="og:image" content="https://lami1a.com/og-image/og-facebook.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://lami1a.com" />
        <meta property="twitter:title" content="Lami1a plateforme to share slections" />
        <meta
          property="twitter:description"
          content="Lami1a plateforme to share slections"
        />
        <meta property="twitter:image" content="https://lami1a.com/og-image/og-twitter.png" />


        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
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
