import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { IFootballPlayer, IPosition } from '../types'
import { addPlayer } from '../api/football-api'

interface AddingNewPlayerProps {
  onPlayerAdded: (player: IFootballPlayer) => void
}

export const AddingNewPlayer = ({ onPlayerAdded }: AddingNewPlayerProps) => {
  const [newPlayer, setNewPlayer] = useState<IFootballPlayer>({
    age: 0,
    id: 0,
    name: '',
    number: 0,
    position: IPosition.Defender,
    team: ''
  })
  const navigate = useNavigate()

  const handleAddPlayer = async () => {
    const player = await addPlayer(newPlayer)

    onPlayerAdded(player)
    toast.success('Player added successfully!', {
      position: 'bottom-right'
    })
    navigate('/')
  }

  return (
    <div className="mb-4 p-6 shadow-lg border border-gray-200 max-w-8xl mx-auto flex items-center space-x-8">
      <label className="mr-2" htmlFor="team">
        Name:
      </label>
      <input
        className="mr-2 p-2 border border-gray-300 w-24"
        id="newName"
        onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
        type="text"
        value={newPlayer.name}
      />

      <label className="mr-2" htmlFor="team">
        Number:
      </label>
      <input
        className="mr-4 p-2 border border-gray-300 w-12"
        id="newNumber"
        onChange={(e) =>
          setNewPlayer({ ...newPlayer, number: parseInt(e.target.value) })
        }
        type="number"
        value={newPlayer.number}
      />

      <label className="mr-2" htmlFor="team">
        Team:
      </label>
      <input
        className="mr-4 p-2 border border-gray-300 w-24"
        id="newTeam"
        onChange={(e) => setNewPlayer({ ...newPlayer, team: e.target.value })}
        type="text"
        value={newPlayer.team}
      />

      <label className="mr-2" htmlFor="team">
        Age:
      </label>
      <input
        className="mr-4 p-2 border border-gray-300 w-12"
        id="newAge"
        onChange={(e) =>
          setNewPlayer({ ...newPlayer, age: parseInt(e.target.value) })
        }
        type="number"
        value={newPlayer.age}
      />

      <label className="mr-2" htmlFor="position">
        Position:
      </label>
      <select
        className="mr-4 p-2 border border-gray-300"
        id="position"
        onBlur={(e) => {
          setNewPlayer({ ...newPlayer, position: e.target.value as IPosition })
        }}
        onChange={(e) => {
          setNewPlayer({ ...newPlayer, position: e.target.value as IPosition })
        }}
        value={newPlayer.position}
      >
        {Object.values(IPosition).map((pos) => (
          <option key={pos} value={pos}>
            {pos}
          </option>
        ))}
      </select>

      <button className="p-2 bg-blue-500 text-white" onClick={handleAddPlayer}>
        Add New Player
      </button>
    </div>
  )
}
