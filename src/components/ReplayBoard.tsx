import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ReplayBoard.css";
import ReplaySpace from "./ReplaySpace";

interface SpaceType {
  color: string | null | undefined;
  king: boolean | null | undefined;
}

type BoardState = {
  [key: string]: SpaceType | null;
};

interface Props {
  boardState: BoardState;
  setActivePlayer: React.Dispatch<React.SetStateAction<string>>;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
  setTurnId: React.Dispatch<React.SetStateAction<number>>;
  setRedScore: React.Dispatch<React.SetStateAction<number>>;
  setBlackScore: React.Dispatch<React.SetStateAction<number>>;
  initializeBoardState: () => BoardState;
  setSelectedReplay: React.Dispatch<React.SetStateAction<any[][]>>;
  selectedReplay: any[][];
  turnId: number;
}

export const ReplayBoard = ({
  boardState,
  setBoardState,
  initializeBoardState,
  setTurnId,
  setActivePlayer,
  setRedScore,
  setBlackScore,
  selectedReplay,
  setSelectedReplay,
  turnId,
}: Props) => {
  let spaceColor = "black";
  const isReplaying = useRef(false);

  const navigate = useNavigate(); // Use the useNavigate hook to get the navigation function
  const playReplay = (replay: any[]) => {
    let index = 0;
    let timeoutId = 0;
    const playTurn = () => {
      if (isReplaying.current && index < replay.length) {
        const turnId = replay[index][0];
        const blackScore = replay[index][2];
        const redScore = replay[index][3];
        const activePlayer = replay[index][4];
        const moveStart = replay[index][5];
        const moveEnd = replay[index][6];

        setBoardState((prevBoardState: BoardState) => {
          const updatedBoardState: BoardState = { ...prevBoardState };

          if (Math.abs(parseInt(moveStart[1]) - parseInt(moveEnd[1])) === 2) {
            let coordinates: number[] = [];
            const moveStartY = parseInt(moveStart[1]);
            const moveEndY = parseInt(moveEnd[1]);
            const moveStartX = parseInt(moveStart[3]);
            const moveEndX = parseInt(moveEnd[3]);

            // UP LEFT
            if (moveStartY - moveEndY === 2 && moveStartX - moveEndX === 2) {
              coordinates = [moveStartY - 1, moveStartX - 1];
            }
            // UP RIGHT
            else if (
              moveStartY - moveEndY === 2 &&
              moveStartX - moveEndX === -2
            ) {
              coordinates = [moveStartY - 1, moveStartX + 1];
            }
            // DOWN LEFT
            else if (
              moveStartY - moveEndY === -2 &&
              moveStartX - moveEndX === 2
            ) {
              coordinates = [moveStartY + 1, moveStartX - 1];
            }
            // DOWN RIGHT
            else if (
              moveStartY - moveEndY === -2 &&
              moveStartX - moveEndX === -2
            ) {
              coordinates = [moveStartY + 1, moveStartX + 1];
            }

            const coordinatesString = `y${coordinates[0]}x${coordinates[1]}`;
            updatedBoardState[coordinatesString] = null;
          }

          const tempColor = updatedBoardState[moveStart]?.color;
          const tempKing = updatedBoardState[moveStart]?.king;

          updatedBoardState[moveStart] = null;
          updatedBoardState[moveEnd] = {
            color: tempColor,
            king: tempKing,
          };
          setActivePlayer(activePlayer);
          setTurnId(turnId);
          setRedScore(redScore);
          setBlackScore(blackScore);

          return updatedBoardState;
        });
        timeoutId = setTimeout(playTurn, 1000);
        index++;
      }
    };

    playTurn();
    return () => {
      isReplaying.current = false;
      clearTimeout(timeoutId);
    };
  };

  useEffect(() => {
    setBoardState(initializeBoardState());
  }, []);

  useEffect(() => {
    if (selectedReplay !== undefined) {
      isReplaying.current = true;
      playReplay(selectedReplay);
    }
  }, [selectedReplay]);

  useEffect(() => {}, [turnId]);

  useEffect(() => {
    return () => {
      isReplaying.current = false;
      setSelectedReplay([]);
    };
  }, [navigate]);

  return (
    <>
      <div className="board-container">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => {
          const isBlackRow = row % 2 === 1;
          return (
            <div className={`x${row}`} key={`row-${row}`}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((col) => {
                const isBlackSpace = isBlackRow ? col % 2 === 1 : col % 2 === 0;
                if (isBlackSpace) {
                  spaceColor = "black";
                } else {
                  spaceColor = "white";
                }

                return (
                  <ReplaySpace
                    setBoardState={setBoardState}
                    spaceColor={spaceColor}
                    boardState={boardState}
                    coordinates={`y${col}x${row}`}
                    key={`space-${col}-${row}`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ReplayBoard;
