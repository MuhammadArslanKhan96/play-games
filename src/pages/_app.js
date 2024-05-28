import "@/styles/globals.css";
import Header from "../../component/Header";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {

  const [gameData, setGameData] = useState(null);
  const [devData, setDevData] = useState(null);
  const [tagData, setTagData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameData = await fetch("/api/get-game-data").then(r => r.json());
        const devData = await fetch("/api/get-dev-data").then(r => r.json());
        const tagData = await fetch("/api/get-tag-data").then(r => r.json());
        
        setGameData(gameData);
        setDevData(devData);
        setTagData(tagData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } 
    };
    fetchData();
  }, []);

  return (
    <>
      <Header tagData={tagData} gameData={gameData} devData={devData}/>
      <script async src="/script.js?v=1.18" onLoad={""}></script>
      <Component {...pageProps} />
    </>
  );
}
