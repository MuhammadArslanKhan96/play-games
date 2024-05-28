import { NextApiRequest, NextApiResponse } from 'next';

const generateSitemap = (gameData, tagData, devData) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<url>
  <loc>https://playem.io</loc>
</url>
${Object.keys(gameData)
  .map((key) => `<url><loc>https://playem.io/app/${key}</loc></url>`)
  .join('\n')}
${Object.keys(tagData)
  .map((key) => `<url><loc>https://playem.io/tag/${key}</loc></url>`)
  .join('\n')}
${Object.keys(devData)
  .map((key) => `<url><loc>https://playem.io/dev/${key}</loc></url>`)
  .join('\n')}
</urlset>`;
};

const Sitemap = async (req = NextApiRequest, res = NextApiResponse) => {
  // Replace these with actual data fetching logic
  const gameData = {}; // Fetch or import your gameData here
  const tagData = {}; // Fetch or import your tagData here
  const devData = {}; // Fetch or import your devData here

  const sitemap = generateSitemap(gameData, tagData, devData);

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
};

export default Sitemap;
