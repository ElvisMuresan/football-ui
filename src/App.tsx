import { useEffect, useState } from "react";
import { PlayerTable } from "./components/PlayerTable";
import { AddingNewPlayer } from "./components/AddingNewPlayer";
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

    const handlePlayerAdded = (player: IFootballPlayer) => {
      setPlayers([...players, player]);
    };

  return (
    <div className="container p-11">
      <div className="font-bold text-3xl mb-11">football-ui</div>
      <AddingNewPlayer onPlayerAdded={handlePlayerAdded}/>

      <PlayerTable players={players} onPlayerClick={handlePLayerClick}/>

     
      <div className="mb-4 p-6 shadow-lg border border-gray-200 max-w-3xl mx-auto flex items-center space-x-8">
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

      {selectedPlayer && (
        <div className="mt-11 mb-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto flex items-center space-x-8">
            <h2 className="font-bold text-2xl text-gray-800 border-b-2 pb-2 mb-0 flex-shrink-0">Player Details</h2>
            <div className="flex-grow">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-24">Id:</span>
                  <span className="text-gray-600">{selectedPlayer.id}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-24">Name:</span>
                  <span className="text-gray-600">{selectedPlayer.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-24">Number:</span>
                  <span className="text-gray-600">{selectedPlayer.number}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-24">Team:</span>
                  <span className="text-gray-600">{selectedPlayer.team}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-24">Age:</span>
                  <span className="text-gray-600">{selectedPlayer.age}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-24">Position:</span>
                  <span className="text-gray-600">{selectedPlayer.position}</span>
                </div>
              </div>
            </div>
        </div>
      )}

      
    </div>
  );
};
