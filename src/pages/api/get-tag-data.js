const fs = require('fs');

export default function handler(req, res) {
  fs.readFile("tagData.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    try {
      const tagData = JSON.parse(data || "{}");

      console.log(tagData, "TAGDATA")
      res.status(200).json(tagData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
}

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser to handle file reading manually
  },
};