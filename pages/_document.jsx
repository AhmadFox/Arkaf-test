import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
    render() {
        return (
            <Html lang="en" dir="ltr">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
                    {/* <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" /> */}
                    {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" /> */}
                    {/* <link rel="stylesheet" href="/css/react-spring-lightbox.css" /> */}
                    {/* <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script> */}
                    {/* <script async defer src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API}&libraries=places&loading=async`}></script> */}


                    {/* Google Adsence */}
                    {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5187122762138955"
                        crossOrigin="true"="anonymous"></script> */}

                            
                </Head>

                <body>
                    <Main />
                    <NextScript />
                    {/* <script src="https://unpkg.com/aos@next/dist/aos.js"></script> */}
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
