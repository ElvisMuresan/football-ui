import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'

import { IFootballPlayer, IPosition } from '../types'
import { deletePlayer, getPlayerById } from '../api/football-api'

import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Button, Modal } from 'flowbite-react'

type IProps = {
  players: IFootballPlayer[]
}

export const PlayerTable = ({ players }: IProps) => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  const [team, setTeam] = useState<string>('')
  const [position, setPosition] = useState<'' | IPosition>('')
  const [playerToDelete, setPlayerToDelete] = useState<IFootballPlayer | null>(
    null
  )

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

  const filterPlayers = players.filter(
    ({ position: playerPosition, team: playerTeam }) => {
      const filterByTeam = playerTeam
        ?.toLowerCase()
        .includes(team.toLowerCase())
      const filterByPosition = !position || playerPosition === position

      return filterByTeam && filterByPosition
    }
  )

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
            >
              <td className="text-right px-5 py-2 border-b border-gray-300">
                {player.id}
              </td>
              <td
                className="text-right px-5 py-2 border-b border-gray-300"
                onClick={() => fetchPlayerById(player.id)}
              >
                {player.name}
              </td>
              <td
                className="text-right px-5 py-2 border-b border-gray-300"
                onClick={() => fetchPlayerById(player.id)}
              >
                {player.team}
              </td>
              <td className="text-right px-5 py-2 border-b border-gray-300">
                <div className="flex justify-end gap-2">
                  <Button
                    className="hover:font-bold mr-5"
                    color="failure"
                    gradientMonochrome="failure"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation()
                      setPlayerToDelete(player)
                      setOpenModal(true)
                    }}
                  >
                    Delete
                  </Button>

                  <Button
                    gradientMonochrome="cyan"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation()
                      navigate(`/${player.id}?edit=true`)
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        onClose={() => {
          setOpenModal(false)
          setPlayerToDelete(null)
        }}
        popup={true}
        show={openModal}
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {`Are you sure you want to delete the player named ${playerToDelete?.name}?`}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  if (playerToDelete) {
                    handleDeletePlayer(playerToDelete.id)
                  }
                  setOpenModal(false)
                }}
              >
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
