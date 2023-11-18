import "../css/Buttons.css";
import "../css/ExportReplay.css";

interface GameTurn {
  turn_id: number;
  red_score: number;
  black_score: number;
  active_player: string;
  move_start: string;
  move_end: string;
}

interface Props {
  exportReplayfunc: (replay: GameTurn[]) => void;
  gameTurns: GameTurn[];
}

export const ExportReplay = ({ exportReplayfunc, gameTurns }: Props) => {
  // return <div onClick={() => exportReplay(gameTurns)}>Export test Replay</div>;
  return (
    <button
      onClick={() => exportReplayfunc(gameTurns)}
      className="button-custom"
    >
      Export Replay
    </button>
    // <div
    //   className="export-replay hyperlink"
    //   onClick={() => exportReplayfunc(gameTurns)}
    // >
    //   Export Replay
    // </div>
  );
};

export default ExportReplay;
