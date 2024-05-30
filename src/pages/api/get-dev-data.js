const fs = require('fs');

export default function handler(req, res) {
  fs.readFile("devData.txt", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    try {
      const devData = JSON.parse(data || "{}");
      res.status(200).json(devData);
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