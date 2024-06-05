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

export const deletePlayer = async (id: number) => {
  const response = await fetch(`${BASE}/players/${id}`, { method: 'DELETE' })
    .then((response) => response.json())
    .catch((error) => console.log('Error:', error))

  return response
}

export const editPlayer = async (
  id: number,
  playerUpdated: {
    age: number
    name: string
    number: number
    position: string
    team: string
  }
): Promise<IFootballPlayer> => {
  const response = await fetch(`${BASE}/players/${id}`, {
    body: JSON.stringify(playerUpdated),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT'
  })
    .then((response) => response.json())
    .catch((error) => console.log('Error:', error))

  return response
}

export const addPlayer = async (
  player: IFootballPlayer
): Promise<IFootballPlayer> => {
  const response = await fetch(`${BASE}/players`, {
    body: JSON.stringify(player),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then((response) => response.json())
    .catch((error) => console.log('Error:', error))

  return response
}
