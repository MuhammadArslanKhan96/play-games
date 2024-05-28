import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

const PlayPage = ({ gameData, params }) => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = gameData[params.id].link;
    }, 500);
  }, [gameData, params.id]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />
        <title>{gameData[params.id].name} Game Files</title>
        <meta property="og:title" content={`${gameData[params.id].name} Game Files`} />
        <meta name="description" content={gameData[params.id].desc} />
        <meta property="og:description" content={gameData[params.id].desc} />
        <meta property="og:image" content={`https://playem.io/img/${params.id}.jpg`} />
        <meta property="og:url" content={`https://playem.io/play/?id=${params.id}`} />
        <link rel="canonical" href={`https://playem.io/play/${params.id}`} />

        <link rel="stylesheet" href="/style.css?v=1.16" />
        <style>{`
          html, body {
            background-color: #002B50;
          }
        `}</style>
      </Head>

      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QDV881PBPN"></Script>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QDV881PBPN');
          `,
        }}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  const gameData = {}; // Fetch or import your gameData here
  const tagData = {}; // Fetch or import your tagData here
  const devData = {}; // Fetch or import your devData here

  return {
    props: {
      gameData,
      params: { id }
    }
  };
}

export default PlayPage;
