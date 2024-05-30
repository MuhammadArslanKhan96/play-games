import { useContext } from "@/pages/_app";
import { openGame, resizeCanvas } from "@/utils";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import GameList from "./GameList";
import LastPlayedList from "./LastPlayedList";

const AppPage = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const { gameData, tagData, devData } = useContext();

  const game = gameData[params.id];

  const getData = async () => {
    setLoading(true);

    window.addEventListener('resize', function () {
      if (gameData[params.id].iframe) resizeCanvas();
    });
    openGame(params.id, gameData);
    loadGame(params.id);
    if (gameData[params.id].iframe) resizeCanvas();
    setLoading(false);
  };

  useEffect(() => {
    if (game) getData();
  }, [game]);

  if (!game) {
    return <div>404 - Game Not Found</div>; // Handle the case where the game is not found
  }

  var loadGame = function (id) {
    document.getElementById('gameFrame').innerHTML = '<iframe id="gameIframe" src="/play/' + id + '" style="height:100%;width:100%;border:0;"></iframe>';
  }

  const dev = devData[game.dev];
  const tags = game.tags.map((tagId) => tagData[tagId]);

  return (
    <>
      <Head>

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
          // position: fixed;
          // top: 60px;
          width: 100%;
          height: 60px;
          background-color: #141516;
          color: #f4f4f4;
          vertical-align: middle;
          display: flex;
          z-index: 9;
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
            onClick={() => window.open(`/play/${params.id}`)}
          >
            <Image
              src={`https://playem.io/img/${params.id}.jpg`}
              width={220}
              height={136}
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
            onClick={() => window.open(`/play/${params.id}`)}
          >
            Play Now
          </div>
        </div>
      </div>

      <div style={!loading ? { display: "none" } : { fontSize: "28px", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center" }}>Loading...</div>

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
              onClick={() => window.open(`/play/${params.id}`)}
            >
              <Image
                src={`https://playem.io/img/${params.id}.jpg`}
                width={220}
                height={136}
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
                onClick={() => window.open(`/play/${params.id}`)}
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
          <LastPlayedList />
          {game.tags.map(
            (tagId, index) =>
              tagData[tagId] && (
                <GameList displayMode={"short"} key={index} name={tagId} sortBy={"rating"} type={"tag"} />
              )
          )}
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
                      text: `${dev ? dev.name : game.dev
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
    </>
  );
};

export default AppPage;
