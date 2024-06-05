import { IFootballPlayer } from '../types'

type IProps = {
  playerss: IFootballPlayer[]
}

export const PlayerTable = ({ playerss }: IProps) => {
  return (
    <table className="table-auto mb-4 w-full border-collapse border  border-gray-300 shadow-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="text-right px-5 py-3 border-b border-gray-300">Id</th>
          <th className="text-right px-5 py-3 border-b border-gray-300">
            Name
          </th>
          <th className="text-right px-5 py-3 border-b border-gray-300">
            Team
          </th>
        </tr>
      </thead>

      <tbody>
        {playerss.map((player) => (
          <tr
            className="cursor-pointer hover:bg-gray-100 transition-colors"
            key={player.id}
            // onClick={() => onPlayerClick(player.id)}
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
          </tr>
        ))}
      </tbody>
    </table>
  )
}
