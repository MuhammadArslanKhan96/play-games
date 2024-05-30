// pages/[id].js
import { useContext } from '@/pages/_app';
import Head from 'next/head';
import { useEffect } from 'react';
import GameList from './GameList';
import LastPlayedList from './LastPlayedList';

export default function DevPage({ id }) {
  const { devData, gameData, tagData } = useContext();

  if (!devData[id]) {
    return <div>404 - Game Not Found</div>; // Handle the case where the game is not found
  }

  const dev = devData[id];

  const getData = async () => {
    if (!Object.keys(tagData).length || !Object.keys(devData).length || !Object.keys(gameData).length) return;

  };

  useEffect(() => {
    getData();
  }, [gameData, tagData, devData]);

  return (
    <>
      <Head>
        <title>{dev?.name} 🕹️ | All Apps By {dev.name} - Playem.io 🐇</title>
        <meta property="og:title" content={`${dev.name} 🕹️ | All Apps By ${dev?.name} - Playem.io 🐇`} />
        <meta name="description" content={dev?.desc} />
        <meta property="og:description" content={dev.desc} />
        <meta property="og:url" content={`https://playem.io/tag/${id}`} />
        <link rel="canonical" href={`https://playem.io/tag/${id}`} />
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
            <LastPlayedList />
            <GameList displayMode={"full"} name={id} sortBy={"rating"} type={"dev"} />
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
      </body>
    </>
  );
}