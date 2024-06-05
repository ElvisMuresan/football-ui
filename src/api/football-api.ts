const BASE = 'http://localhost:3000'

export const getPlayers = async () => {
  const response = await fetch(`${BASE}/players`)
    .then((response) => response.json())
    .catch((error) => console.log('Eror:', error))

  return response
}
