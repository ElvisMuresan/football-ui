import { useEffect, useState } from 'react'

import { IFootballPlayer } from './types'
import { PlayerTable } from './components/PlayerTable'
import { getPlayers } from './api/football-api'

export const App = () => {
  const [players, setPlayers] = useState<IFootballPlayer[]>([])

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!players.length) {
        const response = await getPlayers()

        setPlayers(response)
      }
    }

    fetchPlayers()
  }, [players.length])

  return (
    <div>
      <PlayerTable players={players} />
    </div>
  )
}
