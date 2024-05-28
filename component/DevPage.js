// pages/[id].js
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function DevPage({ devData, gameData, tagData, id }) {

  const dev = devData[id];

  const getData = async () => {
    if(!Object.keys(tagData).length || !Object.keys(devData).length || !Object.keys(gameData).length) return;

    updateLastPlayedList();
    updateGameList("rating", "dev", id, "gameList", "full", tagData, devData, gameData);

  };

  useEffect(() => {
    getData();
  }, [gameData, tagData, devData]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />
        <title>{dev?.name} 🕹️ | All Apps By {dev.name} - Playem.io 🐇</title>
        <meta property="og:title" content={`${dev.name} 🕹️ | All Apps By ${dev?.name} - Playem.io 🐇`} />
        <meta name="description" content={dev?.desc} />
        <meta property="og:description" content={dev.desc} />
        <meta property="og:url" content={`https://playem.io/tag/${id}`} />
        <link rel="canonical" href={`https://playem.io/tag/${id}`} />
        <meta property="og:image" content="https://playem.io/img/img.png" />
        <link rel="stylesheet" href="/style.css?v=1.16" />
        <script src="/script.js?v=1.18" async></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var gameData = ${JSON.stringify(gameData)};
              var tagData = ${JSON.stringify(tagData)};
              var devData = ${JSON.stringify(devData)};
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Games", "item": "https://playem.io/" },
                { "@type": "ListItem", "position": 2, "name": dev.name, "item": `https://playem.io/dev/${id}` }
              ]
            }),
          }}
        />
      </Head>

      <body>
        {/* Include your header component here */}
        <center>
          <div style={{ display: 'inline-block', verticalAlign: 'top', marginTop: '80px', marginBottom: '50px', width: '80%' }}>
            <h2 id="lastPlayedTitle">Continue</h2>
            <div id="lastPlayedList"></div>
            <div id="gameList0"></div>
            <div id="gameList"></div>
          </div>

          <div className="descriptionBubble">
            <h2>{dev.name}</h2>
            <div style={{ margin: '0 30px' }}>
              {dev.desc}
            </div>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": `About ${dev.name}`,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": dev.desc
                      }
                    }
                  ]
                }),
              }}
            />
          </div>
          {/* <div style={loading ? {display: "none"} : {fontSize: "28px", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center" }}>Loading...</div> */}
        </center>


        <script
          dangerouslySetInnerHTML={{
            __html: `
              updateLastPlayedList();
              updateGameList('rating','dev','${id}','gameList0','full');
            `,
          }}
        />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QDV881PBPN"></script>
        <script
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
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  // Fetch your data here, for example from an API or database
  const devData = {};
  const gameData = {}; // Replace with actual fetch
  const tagData = {}; // Replace with actual fetch

  return {
    props: {
      devData,
      gameData,
      tagData,
      id
    }
  };
}
