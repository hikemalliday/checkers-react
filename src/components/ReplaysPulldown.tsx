import { useState } from "react";
import "../css/Buttons.css";

interface SpaceType {
  color: string | null | undefined;
  king: boolean | null | undefined;
}

type BoardState = {
  [key: string]: SpaceType | null;
};

interface Props {
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
  gameIds: any[][];
  deleteGame: (gameId: number) => any;
  fetchReplay: (gameid: number) => any;
  initializeBoardState: () => BoardState;
}

export const ReplaysPulldown = ({
  gameIds,
  fetchReplay,
  initializeBoardState,
  setBoardState,
  deleteGame,
}: Props) => {
  const [selectedGameId, setSelectedGameId] = useState("");
  const handleOptionChange = (e: any) => {
    setSelectedGameId(e.target.value);
  };

  const selectReplay = () => {
    setBoardState(initializeBoardState());
    fetchReplay(parseInt(selectedGameId));
  };

  const deleteReplay = () => {
    setBoardState(initializeBoardState());
    deleteGame(parseInt(selectedGameId));
  };

  return (
    <>
      <div className="replays-pulldown-container">
        <div>
          <select value={selectedGameId} onChange={handleOptionChange}>
            <option className="pulldown">Select Replay:</option>

            {gameIds.map((option) => (
              <option key={option[0]} value={option[0]}>
                Game ID: {option[0]}
              </option>
            ))}
          </select>
          <div>
            <button
              className="button-custom"
              onClick={() => {
                selectReplay();
              }}
            >
              Play Replay
            </button>
          </div>
          <div>
            <button
              className="button-custom"
              onClick={() => {
                deleteReplay();
              }}
            >
              Delete Replay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReplaysPulldown;
