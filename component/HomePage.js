import { useContext } from '@/pages/_app';
import { useEffect, useState } from "react";
import GameList from "./GameList";
import LastPlayedList from './LastPlayedList';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { gameData, tagData, devData } = useContext();


  const getData = async () => {

    if (!Object.keys(tagData).length || !Object.keys(devData).length || !Object.keys(gameData).length) return;

    setLoading(false);

  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      getData();
    }
  }, [gameData, tagData, devData]);

  return (
    <>


      <center>
        <div
          style={{
            verticalAlign: "top",
            marginTop: "60px",
            marginBottom: "50px",
            width: "80%",
          }}
        >
          <LastPlayedList />
          <GameList displayMode={'short'} name={"playemio"} sortBy={'rating'} type={"dev"} />
          <GameList displayMode={'short'} name={"iogames"} sortBy={'rating'} type={"tag"} />
          <GameList displayMode={'short'} name={"fps"} sortBy={'rating'} type={"tag"} />
          <GameList displayMode={'short'} name={"gamesites"} sortBy={'rating'} type={"tag"} />
          <GameList displayMode={'short'} name={"casualgames"} sortBy={'rating'} type={"tag"} />
          <GameList displayMode={'short'} name={"boardgames"} sortBy={'rating'} type={"tag"} />
          <GameList displayMode={'short'} name={"productivity"} sortBy={'rating'} type={"tag"} />
          <GameList displayMode={'short'} name={"animesites"} sortBy={'rating'} type={"tag"} />
        </div>
      </center>

      <div style={!loading ? { display: "none" } : { fontSize: "28px", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center" }}>Loading...</div>
    </>
  );
};
export default HomePage;
