import { useState } from "react";
import { IFootballPlayer, IPosition } from "../types";
import { addPlayer } from "../api/football-api";

interface AddingNewPlayerProps {
    onPlayerAdded: (player: IFootballPlayer) => void;
  }

export const AddingNewPlayer = ({ onPlayerAdded }: AddingNewPlayerProps) => {
    const [newPlayer, setNewPlayer] = useState<IFootballPlayer>({
        id: 0,
        name: "",
        number: 0,
        team: "",
        age: 0,
        position: IPosition.Forward
      });

      const handleAddPlayer = async () => {
        const player = await addPlayer(newPlayer);
        onPlayerAdded(player);
      };

  return (
    <div className="mb-4 p-6 shadow-lg border border-gray-200 max-w-8xl mx-auto flex items-center space-x-8">
        <label htmlFor="team" className="mr-2">Name:</label>
        <input
            type="text"
            id="newName"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
            className="mr-2 p-2 border border-gray-300 w-24"
        />

        <label htmlFor="team" className="mr-2">Number:</label>
        <input
            type="number"
            id="newNumber"
            value={newPlayer.number}
            onChange={(e) => setNewPlayer({...newPlayer, number: parseInt(e.target.value)})}
            className="mr-4 p-2 border border-gray-300 w-12"
        />

        <label htmlFor="team" className="mr-2">Team:</label>
        <input
            type="text"
            id="newTeam"
            value={newPlayer.team}
            onChange={(e) => setNewPlayer({...newPlayer, team: e.target.value})}
            className="mr-4 p-2 border border-gray-300 w-24"
        />

        <label htmlFor="team" className="mr-2">Age:</label>
        <input
            type="number"
            id="newAge"
            value={newPlayer.age}
            onChange={(e) => setNewPlayer({...newPlayer, age: parseInt(e.target.value)})}
            className="mr-4 p-2 border border-gray-300 w-12"
        />

        <label htmlFor="position" className="mr-2">Position:</label>
        <select
            id="position"
            value={newPlayer.position}
            onChange={(e) => {
                setNewPlayer({ ...newPlayer, position: e.target.value as IPosition });
              }}
            className="mr-4 p-2 border border-gray-300"
        >
            <option value="">All</option>
            {Object.values(IPosition).map((pos) => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
        </select>

        <button onClick={handleAddPlayer} className="p-2 bg-blue-500 text-white">Add New Player</button>
    </div>
  );
};
