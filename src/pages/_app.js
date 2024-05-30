import "@/styles/globals.css";
import Header from "../../component/Header";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }) {

  const [gameData, setGameData] = useState({});
  const [devData, setDevData] = useState({});
  const [tagData, setTagData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const gameData = await fetch("/api/get-game-data").then(r => r.json());
        const devData = await fetch("/api/get-dev-data").then(r => r.json());
        const tagData = await fetch("/api/get-tag-data").then(r => r.json());

        setGameData(gameData);
        setDevData(devData);
        setTagData(tagData);
        setLoading(false);
      } catch (err) {
      }
    };
    fetchData();
  }, []);

  return (
    <Context.Provider value={{ gameData, devData, tagData, loading }}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />

        <title>Playem.io 🐇 | Play Games For Free</title>

        <meta
          property="og:title"
          content="Playem.io 🐇 | Play Games For Free"
        />
        <meta
          name="description"
          content="Discover top and best multiplayer web games. Or find new and latest online browser games. All online games in one place!"
        />
        <meta
          property="og:description"
          content="Discover top and best multiplayer web games. Or find new and latest online browser games. All online games in one place!"
        />
        <meta property="og:url" content="https://playem.io/" />
        <link rel="canonical" href="https://playem.io/" />

        <meta property="og:image" content="https://playem.io/img/img.png" />

        <link rel="preconnect" href="https://www.google-analytics.com" />

        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </Head>
      <Header tagData={tagData} gameData={gameData} devData={devData} />
      <Component {...pageProps} />

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
    </Context.Provider>
  );
}


const Context = React.createContext({ gameData: {}, devData: {}, tagData: {} });

export const useContext = () => React.useContext(Context);