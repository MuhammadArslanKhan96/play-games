import { useEffect, useState } from "react";
import HomePage from "../../component/HomePage";

export default function Home() {
  const [gameData, setGameData] = useState({});
  const [devData, setDevData] = useState({});
  const [tagData, setTagData] = useState({});

  useEffect(() => {
    (async () => {
      const gameData = await fetch("/api/get-game-data").then(r => r.json()); // Fetch or import your gameData here
      const devData = await fetch("/api/get-dev-data").then(r => r.json()); // Fetch or import your gameData here
      const tagData = await fetch("/api/get-tag-data").then(r => r.json()); // Fetch or import your gameData here
      
      setGameData(gameData);
      setDevData(devData);
      setTagData(tagData);
    })();
  }, []);


  return (
    <>
      <HomePage gameData={gameData} tagData={tagData} devData={devData} />
    </>
  );
}
