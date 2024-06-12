import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { IFootballPlayer, IPosition } from '../types'
import { deletePlayer, getPlayerById } from '../api/football-api'

type IProps = {
  players: IFootballPlayer[]
}

export const PlayerTable = ({ players }: IProps) => {
  const navigate = useNavigate()
  const [team, setTeam] = useState<string>('')
  const [position, setPosition] = useState<'' | IPosition>('')
  const [playersByParams, setPlayersByParams] = useState<IFootballPlayer[]>([])

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

  const filterPlayers = players.filter((item) => {
    const filterByTeam = item.team.toLowerCase().includes(team.toLowerCase())
    const filterByPostion = position === '' || item.position === position

    return filterByTeam && filterByPostion
  })

  return (
    <>
      <div className=" mt-11 mb-4 p-6 shadow-lg border border-gray-200 max-w-3xl mx-auto flex items-center space-x-8">
        <label className="mr-2" htmlFor="team">
          Team:
        </label>
        <input
          className="mr-4 p-2 border border-gray-300"
          id="team"
          onChange={(e) => setTeam(e.target.value)}
          type="text"
          value={team}
        />

        <label className="mr-2" htmlFor="position">
          Position:
        </label>
        <select
          className="mr-4 p-2 border border-gray-300"
          id="position"
          onBlur={(e) => setPosition(e.target.value as '' | IPosition)}
          onChange={(e) => setPosition(e.target.value as '' | IPosition)}
          value={position}
        >
          <option value="">All</option>
          {Object.values(IPosition).map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>
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
          {filterPlayers.map((player) => (
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
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/${player.id}?edit=true`)
                  }}
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
