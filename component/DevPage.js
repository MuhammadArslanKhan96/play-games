import Head from "next/head";
import { updateGameList, updateLastPlayedList } from "@/utils";
import { useEffect } from "react";

const DevPage = ({ gameData, tagData, devData, params }) => {
  if (!gameData[params.id]) {
    return <div>404 - Game Not Found</div>; // Handle the case where the game is not found
  }

  const game = gameData[params.id];
  const dev = devData[game.dev];
  const tags = game.tags.map((tagId) => tagData[tagId]);

  const getData = async () => {
    updateLastPlayedList();
    updateGameList("rating", "tag", game.name , "sameDeveloperList", "short", tagData, devData, gameData);
    updateGameList("rating", "tag", dev.name , "gameList", "short", tagData, devData, gameData);
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

        <title>{game.name} 🕹️ | For Free Online! 🐇</title>
        <meta
          property="og:title"
          content={`${game.name} 🕹️ | For Free Online! 🐇`}
        />
        <meta name="description" content={game.desc} />
        <meta property="og:description" content={game.desc} />
        <meta
          property="og:image"
          content={`https://playem.io/img/${params.id}.jpg`}
        />
        <meta
          property="og:url"
          content={`https://playem.io/app/${params.id}`}
        />
        <link rel="canonical" href={`https://playem.io/app/${params.id}`} />

        <script async src="/script.js?v=1.18"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log("Start");
              var gameData = ${JSON.stringify(gameData)};
              var tagData = ${JSON.stringify(tagData)};
              var devData = ${JSON.stringify(devData)};
              console.log(gameData);
              console.log(tagData);
              console.log(devData);
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: game.name,
                url: `https://playem.io/app/${params.id}`,
                author: { "@type": "Organization", name: game.dev },
                description: `Want to play ${game.name}? Play this game online for free on Playem.io in fullscreen. ${game.name} is brought to you by ${game.dev} and Playem.io. Have fun and enjoy!`,
                applicationCategory: "GameApplication",
                operatingSystem: "any",
                aggregateRating: {
                  "@type": "AggregateRating",
                  worstRating: 1,
                  bestRating: 5,
                  ratingValue: game.ratingValue,
                  ratingCount: game.ratingCount,
                },
                image: `https://playem.io/img/${params.id}.jpg`,
                offers: {
                  "@type": "Offer",
                  category: "free",
                  price: 0,
                  priceCurrency: "USD",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Games",
                    item: "https://playem.io/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: tags[0].name,
                    item: `https://playem.io/tag/${game.tags[0]}`,
                  },
                ],
              },
            ]),
          }}
        />
      </Head>
      <style jsx>{`
        .gameTitleDiv {
          position: fixed;
          top: 60px;
          width: 100%;
          height: 60px;
          background-color: #141516;
          color: #f4f4f4;
          vertical-align: middle;
          display: flex;
          z-index: 10;
        }
        .descriptionBubble-playButton {
          cursor: pointer;
        }
        .descriptionBubble {
          padding: 10px;
          background-color: #000;
          border-radius: 20px;
          margin: 20px 0;
          margin-top: 80px;
        }
        .descriptionBubble-gameTag {
          display: inline-block;
          background: #444;
          padding: 5px 10px;
          border-radius: 5px;
          margin: 5px;
        }
      `}</style>
      {/* <div className="gameTitleDiv">
        <div id="gameDetails" style={{ display: 'flex', flexDirection: 'row', width: '50%', alignItems: 'center', textAlign: 'left' }}></div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', width: '50%', alignItems: 'center' }}>
          <div className="descriptionBubble-playButton" onClick={() => window.open(`/play/${params.id}`, '_blank')}>
            Play Now
          </div>
        </div>
      </div> */}
      <div className="gameTitleDiv">
        <div
          id="gameDetails"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            alignItems: "center",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "inline-block",
              marginLeft: "30px",
              cursor: "pointer",
            }}
            onClick={() => window.open(`/play/${params.id}`, "_blank")}
          >
            <img
              src={`/img/${params.id}.jpg`}
              width="220px"
              height="136px"
              style={{ borderRadius: "12px" }}
              alt="Play Now"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "8px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "2px",
              }}
            >
              {gameData[params.id].name}
            </span>
            {gameData[params.id].plays != 0 ? (
              <div class="onlineDisplay">
                {gameData[params.id].plays >= 1000000
                  ? gameData[params.id].plays / 1000000 + "M Online"
                  : gameData[params.id].plays >= 1000
                  ? gameData[params.id].plays / 1000 + "K Online"
                  : gameData[params.id].plays + " Online"}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            width: "50%",
            alignItems: "center",
          }}
        >
          <div
            className="descriptionBubble-playButton"
            onClick={() => window.open(`/play/${params.id}`, "_blank")}
          >
            Play Now
          </div>
        </div>
      </div>
      <header>{/* Include partial header here */}</header>
      <div style={{ height: "60px" }}></div>
      <center>
        <div id="gameFrame"></div>
        <div className="descriptionBubble">
          <h2>{game.name}</h2>
          <div>
            <div
              style={{
                display: "inline-block",
                marginLeft: "30px",
                cursor: "pointer",
              }}
              onClick={() => window.open(`/play/${params.id}`, "_blank")}
            >
              <img
                src={`/img/${params.id}.jpg`}
                width="220px"
                height="136px"
                style={{ borderRadius: "12px" }}
                alt="Play Now"
              />
            </div>
            <div style={{ display: "inline-block", verticalAlign: "top" }}>
              <div style={{ margin: "0 30px", lineHeight: "22px" }}>
                <div style={{ width: "120px", display: "inline-block" }}>
                  <ul style={{ padding: 0, margin: 0, listStyleType: "none" }}>
                    <li>Rating:</li>
                    <li>Developer:</li>
                    <li>Last Updated:</li>
                    <li>Released Date:</li>
                  </ul>
                </div>
                <div style={{ display: "inline-block" }}>
                  <ul style={{ padding: 0, margin: 0, listStyleType: "none" }}>
                    {game.ratingValue && game.ratingCount ? (
                      <li>
                        {game.ratingValue}{" "}
                        <span style={{ fontSize: "12px" }}>
                          ({game.ratingCount} votes)
                        </span>
                      </li>
                    ) : (
                      <li>N/A</li>
                    )}
                    {dev ? (
                      <li>
                        <a href={`/dev/${game.dev}`}>{dev.name}</a>
                      </li>
                    ) : game.dev ? (
                      <li>{game.dev}</li>
                    ) : (
                      <li>N/A</li>
                    )}
                    <li>N/A</li>
                    <li>N/A</li>
                  </ul>
                </div>
              </div>
              <div
                className="descriptionBubble-playButton"
                onClick={() => window.open(`/play/${params.id}`, "_blank")}
              >
                Play Now
              </div>
            </div>
            <div style={{ margin: "12px 30px" }}>
              {game.desc ||
                `${game.name} is available for free on Playem.io. Try it out or check out thousands of similar apps on Playem.io.`}
            </div>
            <div style={{ margin: "22px 30px 0 30px" }}>
              {game.tags.map(
                (tagId, index) =>
                  tagData[tagId] && (
                    <a key={index} href={`/tag/${tagId}`}>
                      <div className="descriptionBubble-gameTag">
                        {tagData[tagId].name}
                      </div>
                    </a>
                  )
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            marginBottom: "36px",
            width: "80%",
          }}
        >
          <h2 id="lastPlayedTitle" style={{ display: "none" }}>
            Continue
          </h2>
          <div id="lastPlayedList"></div>
          <div id="sameDeveloperList"></div>
          <div id="gameList"></div>
        </div>
        <div className="descriptionBubble">
          <h2>How to Play</h2>
          <div style={{ margin: "0 30px" }}>
            {game.howToPlay ||
              `${game.name} is available for free online on Playem.io. You can download and install it, use it unblocked, or play it instantly on browser.`}
          </div>
          <h2>What's New</h2>
          <div style={{ margin: "0 30px" }}>{game.updateNotes || "N/A"}</div>
          <h2>About The Developer</h2>
          <div style={{ margin: "0 30px" }}>
            {dev && dev.desc
              ? dev.desc
              : `${dev ? dev.name : game.dev} developed the software.`}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: `What is the rating of ${game.name}?`,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `${game.name} has a rating of ${game.ratingValue}/5 in Playem.io, voted by ${game.ratingCount} people.`,
                    },
                  },
                  {
                    "@type": "Question",
                    name: `Who created ${game.name}?`,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `${
                        dev ? dev.name : game.dev
                      } developed the software.`,
                    },
                  },
                  {
                    "@type": "Question",
                    name: `What is ${game.name}?`,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: game.desc,
                    },
                  },
                  {
                    "@type": "Question",
                    name: `How to Play ${game.name}?`,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `${game.name} is available for free online on Playem.io. Unblocked. Download and Install. Or instant play.`,
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </center>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            updateLastPlayedList();
            if (${JSON.stringify(dev)}) {
              updateGameList('rating', 'dev', '${
                game.dev
              }', 'sameDeveloperList', 'short');
            }
            ${game.tags
              .map(
                (tagId, index) => `
              document.getElementById('gameList').innerHTML += '<div id="gameList${
                index + 1
              }"></div>';
              updateGameList('rating', 'tag', '${tagId}', 'gameList${
                  index + 1
                }', 'short');
            `
              )
              .join("")}
            window.addEventListener('resize', function() {
              if (gameData["${params.id}"].iframe && false) resizeCanvas();
            });
            if (gameData["${params.id}"].iframe && false) resizeCanvas();
            openGame("${params.id}");
            var loadGame = function(id) {
              var playsDisplay = gameData[id].plays === 0 ? '' :
                gameData[id].plays >= 1000000 ? \`\${gameData[id].plays / 1000000}M Online\` :
                gameData[id].plays >= 1000 ? \`\${gameData[id].plays / 1000}K Online\` : \`\${gameData[id].plays} Online\`;
              document.getElementById('gameDetails').innerHTML = \`
                <div style="margin: 10px">
                  <img src="/img/\${id}.png" width="40px" height="40px" style="border-radius:12px" alt="\${gameData[params.id].name}" />
                </div>
                <div style="margin: 10px">
                  <b>\${gameData[id].name}</b><br />
                  \${playsDisplay}
                </div>
              \`;
              if (false) {
                document.getElementById('gameFrame').innerHTML = '<iframe id="gameIframe" src="/play/' + id + '" style="height:100%;width:100%;border:0;"></iframe>';
              }
            }
            loadGame("${params.id}");
          `,
        }}
      />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-QDV881PBPN"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-QDV881PBPN');
          `,
        }}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const gameData = {}; // Fetch or import your gameData here
  const tagData = {}; // Fetch or import your tagData here
  const devData = {}; // Fetch or import your devData here

  // Simulate fetching data
  // You can replace the following with actual fetching logic
  // const gameData = await fetchGameData();
  // const tagData = await fetchTagData();
  // const devData = await fetchDevData();

  return {
    props: { gameData, tagData, devData, params },
  };
}

export default DevPage;
