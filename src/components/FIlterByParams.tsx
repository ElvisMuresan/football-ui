import { useState } from 'react'

import { IFootballPlayer, IPosition } from '../types'
import { getPlayerByParams } from '../api/football-api'

export const FIlterByParams = () => {
  const [team, setTeam] = useState<string>('')
  const [position, setPosition] = useState<'' | IPosition>('')
  const [playersByParams, setPlayersByParams] = useState<IFootballPlayer[]>([])

  const fetchPlayerByParams = async () => {
    const playersByParams = await getPlayerByParams(team, position)

    console.log(playersByParams)
    setPlayersByParams(playersByParams)
  }

  return (
    <>
      <div className="mb-4 p-6 shadow-lg border border-gray-200 max-w-3xl mx-auto flex items-center space-x-8">
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
          value={position}
        >
          <option value="">All</option>
          {Object.values(IPosition).map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>

        <button
          className="p-2 bg-blue-500 text-white"
          onClick={fetchPlayerByParams}
        >
          Filter
        </button>
      </div>
      <div>
        {playersByParams.length > 0 ? (
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
              </tr>
            </thead>

            <tbody>
              {playersByParams.map((player) => (
                <tr
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  key={player.id}
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
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No players found</div>
        )}
      </div>
    </>
  )
}
