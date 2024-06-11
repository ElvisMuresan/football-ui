import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { IFootballPlayer } from '../types'
import { getPlayerById } from '../api/football-api'

export const PlayerDetails = () => {
  const { playerId } = useParams<{ playerId: string }>()
  const [player, setPlayer] = useState<IFootballPlayer | null>(null)

  useEffect(() => {
    const fetchPlayer = async () => {
      if (playerId) {
        const fetchedPlayer = await getPlayerById(Number(playerId))

        setPlayer(fetchedPlayer)
      }
    }

    fetchPlayer()
  }, [playerId])

  if (!player) {
    return <div>Loading...</div>
  }

  return (
    <div className="mt-11 mb-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto">
      <h2 className="font-bold text-2xl text-gray-800 border-b-2 pb-2 mb-4">
        Player Details
      </h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Id:</span>
          <span className="text-gray-600">{player.id}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Name:</span>
          <span className="text-gray-600">{player.name}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Number:</span>
          <span className="text-gray-600">{player.number}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Team:</span>
          <span className="text-gray-600">{player.team}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Age:</span>
          <span className="text-gray-600">{player.age}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-24">Position:</span>
          <span className="text-gray-600">{player.position}</span>
        </div>
      </div>
    </div>
  )
}
