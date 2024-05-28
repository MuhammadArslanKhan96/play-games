import Head from 'next/head';
import { useEffect } from 'react';
import { updateGameList, updateLastPlayedList } from "@/utils";

const TagPage = ({ id, tagData, gameData, devData }) => {

  useEffect(() => {
    if (typeof window !== 'undefined' && gameData && tagData && tagData[id]) {
      updateLastPlayedList(gameData);
      updateGameList("rating", "tag", id, "gameList", "full", tagData, devData, gameData);
      // if (tagData[id].similar) {
      //   tagData[id].similar.forEach((similarTag, index) => {
      //     if (similarTag === id) return;
      //     const div = document.createElement('div');
      //     div.id = `gameList${index + 1}`;
      //     document.getElementById('gameList').appendChild(div);
      //     updateGameList('rating', 'tag', similarTag, `gameList${index + 1}`, 'short');
      //   });
      // }
    }
  }, [id, tagData, gameData, devData]);


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <link rel="shortcut icon" type="image/png" href="/img/favicon.png"/>
        <title>{tagData[id]?.name} 🕹️ | For Free Online! 🐇</title>
        <meta property="og:title" content={`${tagData[id].name} 🕹️ | For Free Online! 🐇`}/>
        <meta name="description" content={tagData[id].desc}/>
        <meta property="og:description" content={tagData[id].desc}/>
        <meta property="og:url" content={`https://playem.io/tag/${id}`}/>
        <link rel="canonical" href={`https://playem.io/tag/${id}`}/>
        <meta property="og:image" content="https://playem.io/img/img.png"/>
        <link rel="stylesheet" href="/style.css?v=1.16"/>
        <script src="/script.js?v=1.18" async></script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "Games", "item": "https://playem.io/"},
              {"@type": "ListItem", "position": 2, "name": tagData[id].name, "item": `https://playem.io/tag/${id}`}
            ]
          })}
        </script>
      </Head>
      <body>
        <center>
          <div style={{ display: 'inline-block', verticalAlign: 'top', marginTop: '60px', marginBottom: '50px', width: '80%' }}>
            <h2 id="lastPlayedTitle">Continue</h2>
            <div id="lastPlayedList"></div>
            <div id="gameList0"></div>
            <div id="gameList"></div>
          </div>
          <div className="descriptionBubble">
            <h2>{tagData[id].fullName}</h2>
            <div style={{ margin: '0 30px' }}>{tagData[id].desc}</div>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": `What is ${tagData[id].name}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": tagData[id].desc
                    }
                  },
                  {
                    "@type": "Question",
                    "name": `How to Play ${tagData[id].name}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `${tagData[id].name} is available for free online on Playem.io.`
                    }
                  },
                  {
                    "@type": "Question",
                    "name": `Who created ${tagData[id].name}?`,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": `Playem.io collected the best and latest ${tagData[id].name} created by different developers all around the world.`
                    }
                  }
                ]
              })}
            </script>
          </div>
        </center>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QDV881PBPN"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QDV881PBPN');
          `}
        </script>
      </body>
    </>
  );
};

export default TagPage;
