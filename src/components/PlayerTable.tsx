import { IFootballPlayer } from "../types";

type IProps = {
  players: IFootballPlayer[];
  onPlayerClick: (id:number) => void;
};

export const PlayerTable = ({players, onPlayerClick}: IProps) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="text-right px-5">Id</th>
          <th className="text-right px-5">Name</th>
          <th className="text-right px-5">Team</th>
        </tr>
      </thead>

      <tbody>
        {players.map((player) => (
          <tr className="cursor-pointer" key={player.id} onClick={() => onPlayerClick(player.id)} >
            <td className="text-right px-5">{player.id}</td>
            <td className="text-right px-5">{player.name}</td>
            <td className="text-right px-5">{player.team}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
