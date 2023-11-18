import { useState, useEffect } from "react";
import ReplayBoard from "../components/ReplayBoard";
import ReplayHeader from "../components/ReplayHeader";

interface SpaceType {
  color: string | null | undefined;
  king: boolean | null | undefined;
}

type BoardState = {
  [key: string]: SpaceType | null;
};

interface Props {
  boardState: BoardState;
  deleteGame: (gameId: number) => void;
  fetchGameIds: () => Promise<any>;
  fetchReplay: (gameId: number) => void;
  gameIds: any[][];
  initializeBoardState: () => BoardState;
  selectedReplay: any[][];
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
  setGameIds: React.Dispatch<React.SetStateAction<any[][]>>;
  setSelectedReplay: React.Dispatch<React.SetStateAction<any[][]>>;
}

export const Replay = ({
  boardState,
  setBoardState,
  initializeBoardState,
  fetchReplay,
  fetchGameIds,
  gameIds,
  setGameIds,
  selectedReplay,
  setSelectedReplay,
  deleteGame,
}: Props) => {
  const [activePlayer, setActivePlayer] = useState<string>("Black");
  const [turnId, setTurnId] = useState<number>(0);
  const [redScore, setRedScore] = useState<number>(0);
  const [blackScore, setBlackScore] = useState<number>(0);

  const getGameIds = async () => {
    setGameIds(await fetchGameIds());
  };

  useEffect(() => {
    getGameIds();
    setSelectedReplay([]);
  }, []);

  return (
    <>
      <div className="replay-container">
        <ReplayHeader
          activePlayer={activePlayer}
          blackScore={blackScore}
          deleteGame={deleteGame}
          fetchReplay={fetchReplay}
          gameIds={gameIds}
          initializeBoardState={initializeBoardState}
          redScore={redScore}
          selectedReplay={selectedReplay}
          setBoardState={setBoardState}
          setSelectedReplay={setSelectedReplay}
          turnId={turnId}
        />

        <ReplayBoard
          boardState={boardState}
          initializeBoardState={initializeBoardState}
          selectedReplay={selectedReplay}
          setActivePlayer={setActivePlayer}
          setBlackScore={setBlackScore}
          setBoardState={setBoardState}
          setRedScore={setRedScore}
          setSelectedReplay={setSelectedReplay}
          setTurnId={setTurnId}
          turnId={turnId}
        />
      </div>
    </>
  );
};

export default Replay;
