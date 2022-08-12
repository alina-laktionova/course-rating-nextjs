import '../styles/globals.css';
import Head from 'next/head';
import React from 'react';
import {AppProps} from "next/dist/shared/lib/router/router";

function MyApp({Component, pageProps, router}: AppProps): JSX.Element {
    return <>
        <Head>
            <title>OWL top</title>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap"
                  rel="stylesheet"/>
            <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
        </Head>
        <Component {...pageProps} />
    </>;
}

export default MyApp;
