import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { IFootballPlayer } from '../types'
import { deletePlayer, editPlayer, getPlayerById } from '../api/football-api'

type IProps = {
  players: IFootballPlayer[]
}

export const PlayerTable = ({ players }: IProps) => {
  const navigate = useNavigate()
  const [selectedPlayer, setSelectedPlayer] = useState<IFootballPlayer | null>(
    null
  )
  const [editPlayerId, setEditPlayerId] = useState<null | number>(null)
  const [editName, setEditName] = useState('')
  const [editNumber, setEditNumber] = useState(0)
  const [editTeam, setEditTeam] = useState('')
  const [editAge, setEditAge] = useState(0)
  const [editPosition, setEditPosition] = useState('')

  const fetchPlayerById = async (id: number) => {
    const player = await getPlayerById(id)

    console.log(player)
    setSelectedPlayer(player)
    navigate(`/${id}`)
  }

  const handleDeletePlayer = async (id: number) => {
    await deletePlayer(id)
    console.log(players)
    setSelectedPlayer(null)
    window.location.reload()
  }

  const editMode = (player: IFootballPlayer) => {
    setEditPlayerId(player.id)
    setEditName(player.name)
    setEditNumber(player.number)
    setEditTeam(player.team)
    setEditAge(player.age)
    setEditPosition(player.position)
  }

  const saveInEdit = async (id: number) => {
    try {
      await editPlayer(id, {
        age: editAge,
        name: editName,
        number: editNumber,
        position: editPosition,
        team: editTeam
      })
      setEditPlayerId(null)
      setSelectedPlayer(null)
    } catch (error) {
      console.error('There was a problem updating the player:', error)
    }
  }

  const closeInEdit = () => {
    setEditPlayerId(null)
    setEditName('')
    setEditNumber(0)
    setEditTeam('')
    setEditAge(0)
    setEditPosition('')
  }

  return (
    <>
      <table className="table-auto mb-4 w-full border-collapse border  border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-right px-5 py-3 border-b border-gray-300">
              Id
            </th>
            <th className="text-right px-5 py-3 border-b border-gray-300">
              Name
            </th>
            <th className="text-right px-5 py-3 border-b border-gray-300">
              Team
            </th>
            <th className="text-right px-5 py-3 border-b border-gray-300">
              Delete / Edit
            </th>
          </tr>
        </thead>

        <tbody>
          {players.map((player) => (
            <tr
              className="cursor-pointer hover:bg-gray-300 transition-colors"
              key={player.id}
              onClick={() => fetchPlayerById(player.id)}
            >
              <td className="text-right px-5 py-2 border-b border-gray-300">
                {player.id}
              </td>
              <td className="text-right px-5 py-2 border-b border-gray-300">
                {player.name}
              </td>
              <td className="text-right px-5 py-2 border-b border-gray-300">
                {player.team}
              </td>
              <td className="text-right px-5 py-2 border-b border-gray-300">
                <button
                  className="text-red-600 hover:font-bold mr-5"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeletePlayer(player.id)
                  }}
                >
                  Delete
                </button>
                <button
                  className="text-blue-600 hover:font-bold"
                  onClick={() => editMode(player)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPlayer && (
        <div className="mt-11 mb-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto flex items-center space-x-8">
          <h2 className="font-bold text-2xl text-gray-800 border-b-2 pb-2 mb-0 flex-shrink-0">
            {editPlayerId ? 'Edit Player' : 'Player Details'}
          </h2>
          <div className="flex-grow">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-24">Id:</span>
                <span className="text-gray-600">{selectedPlayer.id}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-24">Name:</span>
                {editPlayerId ? (
                  <input
                    className="block w-full mt-1 p-2 border rounded-md text-gray-700 font-normal bg-gray-200"
                    onChange={(e) => setEditName(e.target.value)}
                    value={editName}
                  />
                ) : (
                  <span className="text-gray-600">{selectedPlayer.name}</span>
                )}
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-24">
                  Number:
                </span>
                {editPlayerId ? (
                  <input
                    className="block w-full mt-1 p-2 border rounded-md text-gray-700 font-normal bg-gray-200"
                    onChange={(e) => setEditNumber(e.target.value)}
                    value={editNumber}
                  />
                ) : (
                  <span className="text-gray-600">{selectedPlayer.number}</span>
                )}
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-24">Team:</span>
                {editPlayerId ? (
                  <input
                    className="block w-full mt-1 p-2 border rounded-md text-gray-700 font-normal bg-gray-200"
                    onChange={(e) => setEditTeam(e.target.value)}
                    value={editTeam}
                  />
                ) : (
                  <span className="text-gray-600">{selectedPlayer.team}</span>
                )}
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-24">Age:</span>
                {editPlayerId ? (
                  <input
                    className="block w-full mt-1 p-2 border rounded-md text-gray-700 font-normal bg-gray-200"
                    onChange={(e) => setEditAge(e.target.value)}
                    value={editAge}
                  />
                ) : (
                  <span className="text-gray-600">{selectedPlayer.age}</span>
                )}
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-24">
                  Position:
                </span>

                {editPlayerId ? (
                  <input
                    className="block w-full mt-1 p-2 border rounded-md text-gray-700 font-normal bg-gray-200"
                    onChange={(e) => setEditPosition(e.target.value)}
                    value={editPosition}
                  />
                ) : (
                  <span className="text-gray-600">
                    {selectedPlayer.position}
                  </span>
                )}
              </div>
              {editPlayerId && (
                <div className="flex justify-end gap-5 items-center col-span-2">
                  <button
                    className="px-5 py-2 bg-green-400 text-white rounded mt-5 z-10"
                    onClick={() => saveInEdit(selectedPlayer.id)}
                  >
                    Save
                  </button>
                  <button
                    className="px-5 py-2 bg-gray-500 text-white rounded mt-5 z-10"
                    onClick={closeInEdit}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
