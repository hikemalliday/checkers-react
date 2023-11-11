import Score from "./Score";
import Player from "./Player";
import InvalidMove from "./InvalidMove";
import ExportReplay from "../buttons/ExportReplay";
import TurnId from "./TurnId";
import "../css/GameHeader.css";

interface GameTurn {
  turn_id: number;
  red_score: number;
  black_score: number;
  active_player: string;
  move_start: string;
  move_end: string;
}

interface Props {
  activePlayer: string;
  blackScore: number;
  exportReplayfunc: (replay: GameTurn[]) => void;
  gameTurns: GameTurn[];
  invalidMove: boolean;
  redScore: number;
  turnId: number;
}
export const GameHeader = ({
  activePlayer,
  blackScore,
  exportReplayfunc,
  gameTurns,
  invalidMove,
  redScore,
  turnId,
}: Props) => {
  return (
    <>
      {invalidMove}
      <div className="game-header-container">
        <Score redScore={redScore} blackScore={blackScore} />
        <Player activePlayer={activePlayer} />
        <ExportReplay
          exportReplayfunc={exportReplayfunc}
          gameTurns={gameTurns}
        />
      </div>
      <div className="turndId-invalidmove-container">
        <div className="turnId-container">
          <TurnId turnId={turnId} />
        </div>
        {
          <div
            className={`invalid-move-container ${invalidMove ? "show" : ""}`}
          >
            <InvalidMove />
          </div>
        }
      </div>
    </>
  );
};

export default GameHeader;
