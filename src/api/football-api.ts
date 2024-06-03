import { IFootballPlayer } from '../types'

const BASE_URL = 'http://localhost:3000'

export const getPlayers = async () => {
  const response = await fetch(`${BASE_URL}/players`)
    .then((response) => response.json())
    .catch((error) => console.error('Error:', error))

  return response
}

export const getPlayerById = async (
  id: number
): Promise<IFootballPlayer | null> => {
  try {
    const response = await fetch(`${BASE_URL}/players/${id}`)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return await response.json()
  } catch (error) {
    console.error('Error:', error)

    return null
  }
}

export const addPlayer = async (
  player: IFootballPlayer
): Promise<IFootballPlayer> => {
  const response = await fetch(`${BASE_URL}/players`, {
    body: JSON.stringify(player),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })

  return response.json()
}
