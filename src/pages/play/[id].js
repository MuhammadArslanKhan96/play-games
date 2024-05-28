import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import PlayPage from "../../../component/PlayPage";

export default function PlayData() {
  const router = useRouter();
  const { id } = router.query;

  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Don't fetch until we have the id

    const fetchData = async () => {
      try {
        const gameData = await fetch("/api/get-game-data").then(r => r.json());
        
        setGameData(gameData);
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

  console.log(gameData);

  return (
    <>
      <PlayPage gameData={gameData} params={{ id }} />
    </>
  );
}
