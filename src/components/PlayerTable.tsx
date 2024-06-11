import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import React from 'react'

import { IFootballPlayer } from '../types'
import { deletePlayer, editPlayer, getPlayerById } from '../api/football-api'

import { Button, Label, Modal, Select, TextInput } from 'flowbite-react'

type IProps = {
  players: IFootballPlayer[]
}

export const PlayerTable = ({ players }: IProps) => {
  const navigate = useNavigate()
  const [editPlayerId, setEditPlayerId] = useState<null | number>(null)
  const [editName, setEditName] = useState('')
  const [editNumber, setEditNumber] = useState(0)
  const [editTeam, setEditTeam] = useState('')
  const [editAge, setEditAge] = useState(0)
  const [editPosition, setEditPosition] = useState('')
  const emailInputRef = useRef<HTMLInputElement>(null)

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

  const editMode = (player: IFootballPlayer) => {
    setEditPlayerId(player.id)
    setEditName(player.name)
    setEditNumber(player.number)
    setEditTeam(player.team)
    setEditAge(player.age)
    setEditPosition(player.position)
  }

  const saveInEdit = async (id: number) => {
    try {
      await editPlayer(id, {
        age: editAge,
        name: editName,
        number: editNumber,
        position: editPosition,
        team: editTeam
      })
      setEditPlayerId(null)
      // setSelectedPlayer(null)
    } catch (error) {
      console.error('There was a problem updating the player:', error)
    }
  }

  const closeInEdit = () => {
    setEditPlayerId(null)
    setEditName('')
    setEditNumber(0)
    setEditTeam('')
    setEditAge(0)
    setEditPosition('')
  }

  return (
    <>
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
            <th className="text-right px-5 py-3 border-b border-gray-300">
              Delete / Edit
            </th>
          </tr>
        </thead>

        <tbody>
          {players.map((player) => (
            <React.Fragment key={player.id}>
              <tr
                className="cursor-pointer hover:bg-gray-300 transition-colors"
                key={player.id}
                onClick={() => fetchPlayerById(player.id)}
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
                <td className="text-right px-5 py-2 border-b border-gray-300">
                  <button
                    className="text-red-600 hover:font-bold mr-5"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeletePlayer(player.id)
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="text-blue-600 hover:font-bold"
                    onClick={() => editMode(player)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <Modal
                initialFocus={emailInputRef}
                onClose={closeInEdit}
                show={editPlayerId !== null}
                size="lg"
              >
                <Modal.Header>Edit Player</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="name" value="Name" />
                      </div>
                      <TextInput
                        onChange={(e) => setEditName(e.target.value)}
                        value={editName}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label value="Team" />
                      </div>
                      <TextInput
                        onChange={(e) => setEditTeam(e.target.value)}
                        value={editTeam}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label value="Number" />
                      </div>
                      <TextInput
                        onChange={(e) => setEditNumber(Number(e.target.value))}
                        value={editNumber}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label value="Number" />
                      </div>
                      <TextInput
                        onChange={(e) => setEditAge(Number(e.target.value))}
                        value={editAge}
                      />
                    </div>
                    <div className="max-w-md">
                      <div className="mb-2 block">
                        <Label value="Position" />
                      </div>
                      <Select
                        onChange={(e) => setEditPosition(e.target.value)}
                        value={editPosition}
                      >
                        <option>{player.position}</option>
                        <option>Forward</option>
                        <option>Midfielder</option>
                        <option>Defender</option>
                        <option>Goalkeeper</option>
                      </Select>
                    </div>
                    <Button
                      color="success"
                      onClick={() => saveInEdit(player.id)}
                    >
                      Save
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  )
}
