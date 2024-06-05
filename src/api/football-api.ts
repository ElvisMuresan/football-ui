import { IFootballPlayer } from '../types'

const BASE = 'http://localhost:3000'

export const getPlayers = async () => {
  const response = await fetch(`${BASE}/players`)
    .then((response) => response.json())
    .catch((error) => console.log('Eror:', error))

  return response
}

export const getPlayerById = async (
  id: number
): Promise<IFootballPlayer | null> => {
  const response = await fetch(`${BASE}/players/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log('Error:', error))

  return response
}

export const getPlayerByParams = async (
  team: string,
  position: string
): Promise<IFootballPlayer[]> => {
  const query = new URLSearchParams({ position, team })
  const response = await fetch(`${BASE}/players?${query.toString()}`)
    .then((response) => response.json())
    .catch((error) => console.log('Error:', error))

  return response
}
