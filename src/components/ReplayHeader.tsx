import Score from "./Score";
import Player from "./Player";
import ReplaysPulldown from "./ReplaysPulldown";
import TurnId from "./TurnId";
import "../css/ReplayHeader.css";

interface SpaceType {
  color: string | null | undefined;
  king: boolean | null | undefined;
}

type BoardState = {
  [key: string]: SpaceType | null;
};

interface Props {
  activePlayer: string;
  blackScore: number;
  deleteGame: (gameId: number) => void;
  fetchReplay: (gameId: number) => void;
  gameIds: any[][];
  initializeBoardState: () => BoardState;
  redScore: number;
  selectedReplay: any[][];
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
  setSelectedReplay: React.Dispatch<React.SetStateAction<any[][]>>;
  turnId: number;
}

export const ReplayHeader = ({
  setBoardState,
  fetchReplay,
  initializeBoardState,
  gameIds,
  redScore,
  blackScore,
  activePlayer,
  turnId,

  deleteGame,
}: Props) => {
  return (
    <>
      <div className="replay-header-container">
        <Score redScore={redScore} blackScore={blackScore} />
        <Player activePlayer={activePlayer} />
        <ReplaysPulldown
          deleteGame={deleteGame}
          setBoardState={setBoardState}
          gameIds={gameIds}
          fetchReplay={fetchReplay}
          initializeBoardState={initializeBoardState}
        />
      </div>

      <div className="turndId-invalidmove-container">
        <div className="turnId-container">
          <TurnId turnId={turnId} />
        </div>
      </div>
    </>
  );
};

export default ReplayHeader;
