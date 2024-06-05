import { useEffect, useState } from 'react'

import { IFootballPlayer } from './types'
import { PlayerTable } from './components/PlayerTable'
import { FIlterByParams } from './components/FIlterByParams'
import { AddingNewPlayer } from './components/AddNewPlayer'
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

  const handlePlayerAdded = (player: IFootballPlayer) => {
    setPlayers([...players, player])
  }

  return (
    <div className="p-12">
      <AddingNewPlayer onPlayerAdded={handlePlayerAdded} />

      <PlayerTable players={players} />
      <FIlterByParams />
    </div>
  )
}
