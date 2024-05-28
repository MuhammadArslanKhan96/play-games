import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import DevPage from "../../../component/DevPage";

export default function AppPage() {
  const router = useRouter();
  const { id } = router.query;

  const [gameData, setGameData] = useState(null);
  const [devData, setDevData] = useState(null);
  const [tagData, setTagData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Don't fetch until we have the id

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
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  console.log(gameData, tagData, devData);

  return (
    <>
      <DevPage gameData={gameData} tagData={tagData} devData={devData} params={{ id }} />
    </>
  );
}
