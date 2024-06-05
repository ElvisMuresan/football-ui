import { useState } from 'react'

import { IFootballPlayer } from '../types'
import { deletePlayer, getPlayerById } from '../api/football-api'

type IProps = {
  players: IFootballPlayer[]
}

export const PlayerTable = ({ players }: IProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<IFootballPlayer | null>(
    null
  )

  const fetchPlayerById = async (id: number) => {
    const player = await getPlayerById(id)

    console.log(player)
    setSelectedPlayer(player)
  }

  const handleDeletePlayer = async (id: number) => {
    await deletePlayer(id)
    console.log(players)
    setSelectedPlayer(null)
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
                  onClick={() => handleDeletePlayer(player.id)}
                >
                  Delete
                </button>
                <button className="text-blue-600 hover:font-bold">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPlayer && (
        <div className="mt-11 mb-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto flex items-center space-x-8">
          <h2 className="font-bold text-2xl text-gray-800 border-b-2 pb-2 mb-0 flex-shrink-0">
            Player Details
          </h2>
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
                <span className="font-semibold text-gray-700 w-24">
                  Number:
                </span>
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
                <span className="font-semibold text-gray-700 w-24">
                  Position:
                </span>
                <span className="text-gray-600">{selectedPlayer.position}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
