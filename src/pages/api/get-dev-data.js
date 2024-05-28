const fs = require('fs');

export default function handler(req, res) {
  fs.readFile("devData.txt", "utf8", (err, data) => {
    console.log(data , "DATA CHECK");
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    try {
      const devData = JSON.parse(data || "{}");
      console.log(devData , "dev data");
      res.status(200).json(devData);
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