import { updateGameList, updateLastPlayedList } from "@/utils";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";

const HomePage = ({ gameData, tagData, devData }) => {

    const getData = async () => {

    updateLastPlayedList();
    updateGameList("rating", "dev", "playemio", "gameList1", "short", tagData, devData, gameData);
    updateGameList("rating", "tag", "iogames", "gameList2", "short", tagData, devData, gameData);
    updateGameList("rating", "tag", "fps", "gameList3", "short", tagData, devData, gameData);
    updateGameList("rating", "tag", "gamesites", "gameList4", "short", tagData, devData, gameData);
    updateGameList("rating", "tag", "casualgames", "gameList5", "short", tagData, devData, gameData);
    updateGameList("rating", "tag", "boardgames", "gameList6", "short", tagData, devData, gameData);
    updateGameList("rating", "tag", "productivity", "gameList7", "short", tagData, devData, gameData);
    updateGameList("rating", "tag", "animesites", "gameList8", "short", tagData, devData, gameData);
  };

  useEffect(() => {
    getData();
  }, [gameData, tagData, devData]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />

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

        <link rel="stylesheet" href="/style.css?v=1.16" />
      </Head>

      <body style={{ backgroundColor: "#2B2D31" }}>
        <header>{/* Include the header partial here */}</header>

        <center>
          <div
            style={{
              display: "inline-block",
              verticalAlign: "top",
              marginBottom: "50px",
              width: "80%",
            }}
          >
            <h2 id="lastPlayedTitle" >
              Continue
            </h2>
            <div id="lastPlayedList"></div>

            <div id="gameList0"></div>
            <div id="gameList1"></div>
            <div id="gameList2"></div>
            <div id="gameList3"></div>
            <div id="gameList4"></div>
            <div id="gameList5"></div>
            <div id="gameList6"></div>
            <div id="gameList7"></div>
            <div id="gameList8"></div>
            <div id="gameList9"></div>
            <div id="gameList10"></div>
            <div id="gameList11"></div>
          </div>
        </center>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QDV881PBPN"
        />
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
      </body>
    </>
  );
};
export default HomePage;
