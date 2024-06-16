import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { IFootballPlayer, IPosition } from '../types'
import { addPlayer } from '../api/football-api'

import { Button, Label, Select, TextInput } from 'flowbite-react'

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
    console.log('Adding player:', newPlayer)

    const player = await addPlayer(newPlayer)

    onPlayerAdded(player)
    toast.success('Player added successfully!', {
      position: 'bottom-right'
    })
    navigate('/')
  }

  return (
    <div className="flex justify-center">
      <form className="mt-11 flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Player Name" />
          </div>
          <TextInput
            id="newName"
            onChange={(e) =>
              setNewPlayer({ ...newPlayer, name: e.target.value })
            }
            required={true}
            shadow={true}
            type="text"
            value={newPlayer.name}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Player Number" />
          </div>
          <TextInput
            id="newNumber"
            onChange={(e) =>
              setNewPlayer({ ...newPlayer, number: parseInt(e.target.value) })
            }
            required={true}
            shadow={true}
            type="number"
            value={newPlayer.number}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Player Team" />
          </div>
          <TextInput
            id="newTeam"
            onChange={(e) =>
              setNewPlayer({ ...newPlayer, team: e.target.value })
            }
            required={true}
            shadow={true}
            type="text"
            value={newPlayer.team}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Player Age" />
          </div>
          <TextInput
            id="newAge"
            onChange={(e) =>
              setNewPlayer({ ...newPlayer, age: parseInt(e.target.value) })
            }
            required={true}
            shadow={true}
            type="number"
            value={newPlayer.age}
          />
        </div>

        <div className="mb-2 block">
          <Label htmlFor="repeat-password" value="Player Position" />
        </div>
        <Select
          id="position"
          onBlur={(e) => {
            setNewPlayer({
              ...newPlayer,
              position: e.target.value as IPosition
            })
          }}
          onChange={(e) => {
            setNewPlayer({
              ...newPlayer,
              position: e.target.value as IPosition
            })
          }}
          required={true}
          shadow={true}
          type="text"
          value={newPlayer.position}
        >
          {Object.values(IPosition).map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </Select>

        <Button
          className="p-2 bg-blue-500 text-white"
          gradientMonochrome="cyan"
          onClick={handleAddPlayer}
        >
          Add New Player
        </Button>
      </form>
    </div>
  )
}
