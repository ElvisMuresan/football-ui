import { useEffect, useState } from "react";
import { PlayerTable } from "./components/PlayerTable";
import { IFootballPlayer, IPosition } from "./types";
import { getPlayers, getPlayerById } from "./api/football-api";

export const App = () => {
  const [players, setPlayers] = useState<IFootballPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<IFootballPlayer | null>(null)
  const [team, setTeam] = useState<string>("")
  const [position, setPosition] = useState<IPosition | "">("")

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

    const handleFilter = async () => {
      const response = await getPlayers()
      const filteredPlayers = response.filter((player: IFootballPlayer) => {
        return (
          (team ? player.team === team : true) && 
          (position ? player.position === position : true)
        )
      })
      setPlayers(filteredPlayers)
    }

  return (
    <div className="container p-11">
      <div className="font-bold text-3xl mb-11">football-ui</div>
        <div className="mb-4">
          <label htmlFor="team" className="mr-2">Team:</label>
          <input
            type="text"
            id="team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="mr-4 p-2 border border-gray-300"
          />

          <label htmlFor="position" className="mr-2">Position:</label>
          <select
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value as IPosition | "")}
            className="mr-4 p-2 border border-gray-300"
          >
            <option value="">All</option>
            {Object.values(IPosition).map((pos) => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>

          <button onClick={handleFilter} className="p-2 bg-blue-500 text-white">Filter</button>
        </div>
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
