const fs = require('fs');

export default function handler(req, res) {
  fs.readFile("gameData.txt", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    try {
      const gameData = JSON.parse(data || "{}");
      res.status(200).json(gameData);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
}

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser to handle file reading manually
  },
};