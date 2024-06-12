import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { IFootballPlayer } from './types'
import { PlayerTable } from './components/PlayerTable'
import { PlayerDetails } from './components/PlayerDetails'
import { Nav } from './components/Nav'
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
      <Router>
        <Routes>
          <Route element={<Nav />} path="/">
            <Route element={<PlayerTable players={players} />} path="/" />
            <Route
              element={<AddingNewPlayer onPlayerAdded={handlePlayerAdded} />}
              path="newPlayer"
            />
            <Route element={<PlayerDetails />} path="/:playerId" />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}
