import { useContext } from '@/pages/_app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import GameList from './GameList';
import LastPlayedList from './LastPlayedList';

const TagPage = ({ id }) => {
  const { gameData, tagData, devData } = useContext();
  const [similarTags, setSimilarTags] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && gameData && tagData && tagData[id]) {
      if (tagData[id].similar) {
        let similarTags = [];
        tagData[id].similar.forEach((similarTag, index) => {
          if (similarTag === id) return;
          similarTags.push(similarTag);
        });

        setSimilarTags(similarTags);
      }
    }
  }, [id, tagData, gameData, devData]);


  if (!tagData[id]) return;


  return (
    <>
      <Head>
        <title>{tagData[id]?.name} 🕹️ | For Free Online! 🐇</title>
        <meta property="og:title" content={`${tagData[id].name} 🕹️ | For Free Online! 🐇`} />
        <meta name="description" content={tagData[id].desc} />
        <meta property="og:description" content={tagData[id].desc} />
        <meta property="og:url" content={`https://playem.io/tag/${id}`} />
        <link rel="canonical" href={`https://playem.io/tag/${id}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Games", "item": "https://playem.io/" },
              { "@type": "ListItem", "position": 2, "name": tagData[id].name, "item": `https://playem.io/tag/${id}` }
            ]
          })}
        </script>
      </Head>
      <body>
        <center>
          <div style={{ verticalAlign: 'top', marginTop: '60px', marginBottom: '50px', width: '80%' }}>
            <LastPlayedList />
            <GameList displayMode={'full'} name={id} sortBy={'rating'} type={"tag"} />
            {similarTags.map((item, key) => (
              <GameList displayMode={'short'} name={item} key={key} sortBy={'rating'} type={"tag"} />
            ))}
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
      </body>
    </>
  );
};

export default TagPage;
