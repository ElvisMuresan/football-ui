import { useEffect, useState } from "react";
import { PlayerTable } from "./components/PlayerTable";
import { IFootballPlayer } from "./types";
import { getPlayers, getPlayerById } from "./api/football-api";

export const App = () => {
  const [players, setPlayers] = useState<IFootballPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<IFootballPlayer | null>(null)

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!players.length) {
        // Acest cod se execută o dată când se încarcă componenta
        const response = await getPlayers();
        setPlayers(response);
      }
    };

    fetchPlayers();
  }, [players.length]);
  
    const handlePLayerClick = async(id: number) => {
      const player = await getPlayerById(id)
      setSelectedPlayer(player)
    }

  return (
    <div className="container p-11">
      <div className="font-bold text-3xl mb-11">football-ui</div>

      <PlayerTable players={players} onPlayerClick={handlePLayerClick}/>

      {selectedPlayer && (
        <div className="mt-11">
        <h2 className="font-bold text-2xl mb-4">Player Details</h2>
        <div>Id: {selectedPlayer.id}</div>
        <div>Name: {selectedPlayer.name}</div>
        <div>Number: {selectedPlayer.number}</div>
        <div>Team: {selectedPlayer.team}</div>
        <div>Age: {selectedPlayer.age}</div>
        <div>Position: {selectedPlayer.position}</div>
      </div>
      )}
    </div>
  );
};
