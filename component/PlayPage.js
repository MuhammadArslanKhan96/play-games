import { useEffect } from 'react';
import Head from 'next/head';
import { useContext } from '@/pages/_app';
import { useRouter } from 'next/router';

const PlayPage = () => {
  const { gameData } = useContext();
  const params = useRouter().query;

  useEffect(() => {
    setTimeout(() => {
      if (!gameData[params.id]) return;
      window.location.href = gameData[params.id].link;
    }, 500);
  }, [gameData, params.id]);

  if (!gameData[params.id]) {
    return <div>404 - Game Not Found</div>; // Handle the case where the game is not found
  }

  return (
    <>
      <Head>
        <title>{gameData[params.id].name} Game Files</title>
        <meta property="og:title" content={`${gameData[params.id].name} Game Files`} />
        <meta name="description" content={gameData[params.id].desc} />
        <meta property="og:description" content={gameData[params.id].desc} />
        <meta property="og:image" content={`https://playem.io/img/${params.id}.jpg`} />
        <meta property="og:url" content={`https://playem.io/play/?id=${params.id}`} />
        <link rel="canonical" href={`https://playem.io/play/${params.id}`} />

        <style>{`
          html, body {
            background-color: #002B50;
          }
        `}</style>
      </Head>
    </>
  );
};

export default PlayPage;
