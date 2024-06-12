import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { IFootballPlayer } from '../types'
import { editPlayer, getPlayerById } from '../api/football-api'

import { Button, Select, TextInput } from 'flowbite-react'

export const PlayerDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { playerId } = useParams<{ playerId: string }>()
  const searchParams = new URLSearchParams(location.search)
  const isEditMode = searchParams.get('edit') === 'true'
  const [player, setPlayer] = useState<IFootballPlayer | null>(null)
  const [editPlayerId, setEditPlayerId] = useState<null | number>(null)
  const [editName, setEditName] = useState('')
  const [editNumber, setEditNumber] = useState(0)
  const [editTeam, setEditTeam] = useState('')
  const [editAge, setEditAge] = useState(0)
  const [editPosition, setEditPosition] = useState('')

  useEffect(() => {
    const fetchPlayer = async () => {
      if (playerId) {
        const fetchedPlayer = await getPlayerById(Number(playerId))

        setPlayer(fetchedPlayer)
        if (isEditMode && fetchedPlayer) {
          setEditPlayerId(fetchedPlayer.id)
          setEditName(fetchedPlayer.name)
          setEditNumber(fetchedPlayer.number)
          setEditTeam(fetchedPlayer.team)
          setEditAge(fetchedPlayer.age)
          setEditPosition(fetchedPlayer.position)
        }
      }
    }

    fetchPlayer()
  }, [playerId, isEditMode])

  if (!player) {
    return <div>Loading...</div>
  }

  // const editMode = (player: IFootballPlayer) => {
  //   setEditPlayerId(player.id)
  //   setEditName(player.name)
  //   setEditNumber(player.number)
  //   setEditTeam(player.team)
  //   setEditAge(player.age)
  //   setEditPosition(player.position)
  // }

  const saveInEdit = async (id: number) => {
    try {
      await editPlayer(id, {
        age: editAge,
        name: editName,
        number: editNumber,
        position: editPosition,
        team: editTeam
      })
      setPlayer({
        ...player,
        age: editAge,
        name: editName,
        number: editNumber,
        position: editPosition,
        team: editTeam
      })
      setEditPlayerId(null)
      navigate('/')

      console.log('editSave:', editPlayerId)
    } catch (error) {
      console.error('There was a problem updating the player:', error)
    }
  }

  const closeInEdit = () => {
    setEditPlayerId(null)
  }

  console.log(editPlayerId)

  return (
    <div className="mt-11 mb-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto">
      <h2 className="font-bold text-2xl text-gray-800 border-b-2 pb-2 mb-4">
        {editPlayerId ? 'Edit Player' : 'Player Details'}
      </h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Id:</span>
          <span className="text-gray-600">{player.id}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Name:</span>
          {editPlayerId ? (
            <TextInput
              onChange={(e) => setEditName(e.target.value)}
              value={editName}
            />
          ) : (
            <span className="text-gray-600">{player.name}</span>
          )}
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Number:</span>
          {editPlayerId ? (
            <TextInput
              onChange={(e) => setEditNumber(parseInt(e.target.value))}
              type="number"
              value={editNumber}
            />
          ) : (
            <span className="text-gray-600">{player.number}</span>
          )}{' '}
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Team:</span>
          {editPlayerId ? (
            <TextInput
              onChange={(e) => setEditTeam(e.target.value)}
              value={editTeam}
            />
          ) : (
            <span className="text-gray-600">{player.team}</span>
          )}{' '}
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Age:</span>
          {editPlayerId ? (
            <TextInput
              onChange={(e) => setEditAge(parseInt(e.target.value))}
              type="number"
              value={editAge}
            />
          ) : (
            <span className="text-gray-600">{player.age}</span>
          )}{' '}
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Position:</span>
          {editPlayerId ? (
            <Select
              onChange={(e) => setEditPosition(e.target.value)}
              value={editPosition}
            >
              <option>Forward</option>
              <option>Midfielder</option>
              <option>Defender</option>
              <option>Goalkeeper</option>
            </Select>
          ) : (
            <span className="text-gray-600">{player.position}</span>
          )}
        </div>
      </div>
      {editPlayerId && (
        <div className="mt-4 flex justify-end space-x-4">
          <Button color="gray" onClick={closeInEdit}>
            Cancel
          </Button>
          <Button color="success" onClick={() => saveInEdit(editPlayerId)}>
            Save
          </Button>
        </div>
      )}
    </div>
  )
}
