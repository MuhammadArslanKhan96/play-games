import { useContext } from '@/pages/_app';
import React from 'react';

const Sitemap = () => {
  const { gameData, tagData, devData } = useContext();
  return (
    <div style={{ backgroundColor: 'white', color: 'black'  }}>
    <urlset xmlnsXsi="http://www.w3.org/2001/XMLSchema-instance" xsiSchemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://playem.io</loc>
      </url>

      {Object.keys(gameData).map((i) => (
        <url key={i}>
          <loc>https://playem.io/app/{i}</loc>
        </url>
      ))}

      {Object.keys(tagData).map((i) => (
        <url key={i}>
          <loc>https://playem.io/tag/{i}</loc>
        </url>
      ))}

      {Object.keys(devData).map((i) => (
        <url key={i}>
          <loc>https://playem.io/dev/{i}</loc>
        </url>
      ))}
    </urlset>
    </div>
  );
};

export default Sitemap;
