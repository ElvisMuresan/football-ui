import { useNavigate } from 'react-router-dom'

import { IFootballPlayer } from '../types'
import { deletePlayer, getPlayerById } from '../api/football-api'

type IProps = {
  players: IFootballPlayer[]
}

export const PlayerTable = ({ players }: IProps) => {
  const navigate = useNavigate()

  const fetchPlayerById = async (id: number) => {
    const player = await getPlayerById(id)

    console.log(player)
    navigate(`/${id}`)
  }

  const handleDeletePlayer = async (id: number) => {
    await deletePlayer(id)
    console.log(players)
    window.location.reload()
  }

  return (
    <>
      <table className="mt-11 table-auto mb-4 w-full border-collapse border  border-gray-300 shadow-lg">
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
            >
              <td className="text-right px-5 py-2 border-b border-gray-300">
                {player.id}
              </td>
              <td
                className="text-right px-5 py-2 border-b border-gray-300"
                onClick={() => fetchPlayerById(player.id)}
              >
                {player.name}
              </td>
              <td
                className="text-right px-5 py-2 border-b border-gray-300"
                onClick={() => fetchPlayerById(player.id)}
              >
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
                  onClick={() => fetchPlayerById(player.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
