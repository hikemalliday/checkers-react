import Space from "../components/Space";
import { useState, useEffect } from "react";
import "../css/Board.css";

interface SpaceType {
  piece: boolean;
  color: string;
  king: boolean;
}

interface Props {
  boardState: Record<string, SpaceType>;
}

export const Board = () => {
  const [moveStart, setMoveStart] = useState(["", ""]);
  const [moveEnd, setMoveEnd] = useState(["", ""]);

  useEffect(() => {
    // This useEffect will run whenever moveStart or moveEnd changes
    if (moveStart[0] !== "" && moveEnd[0] !== "") {
      isMoveValid(moveStart, moveEnd);
    }
  }, [moveEnd]);

  const isMoveValid = (moveStart: string[], moveEnd: string[]) => {
    console.log("isMoveValid, moveStart: ", moveStart);
    console.log("isMoveValid, moveEnd: ", moveEnd);
    if (
      Math.abs((moveStart[0] as any) - (moveEnd[0] as any)) == 1 &&
      Math.abs((moveStart[1] as any) - (moveEnd[1] as any)) == 1
    ) {
      let keyMoveStart = `y${moveStart[0]}x${moveStart[1]}`;
      let keyMoveEnd = `y${moveEnd[0]}x${moveEnd[1]}`;
      let updatedBoardState = { ...boardState };
      updatedBoardState[keyMoveStart].piece = false;
      updatedBoardState[keyMoveEnd].piece = true;
      updatedBoardState[keyMoveEnd].color =
        updatedBoardState[keyMoveStart].color;
      setBoardState(updatedBoardState);
    } else {
      console.log("invalid move");
      return false;
    }
    return true;
  };

  const handleClick = (e: React.MouseEvent) => {
    const targetId = e.currentTarget.id as string;
    setMoveStart([...targetId[1], targetId[3]]);
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleOnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target && target.id) {
      const targetId = target.id;
      setMoveEnd([...targetId[1], targetId[3]]);
      console.log(moveStart);
      console.log(moveEnd);
      // isMoveValid(moveStart, moveEnd);
    }
  };

  const initialBoardState: Record<string, SpaceType> = {};
  for (let y = 1; y <= 8; y++) {
    let isBlackRow = y % 2 === 0;

    for (let x = 1; x <= 8; x++) {
      const isBlackPiece = isBlackRow ? x % 2 === 1 : x % 2 === 0;
      const key = `y${y}x${x}`;
      if (y < 5) {
        initialBoardState[key] = {
          piece: true,
          color: "black",
          king: false,
        };
      } else {
        initialBoardState[key] = { piece: true, color: "red", king: false };
      }

      if (isBlackPiece) {
        initialBoardState[key].piece = true;
      } else {
        initialBoardState[key].piece = false;
      }
    }
  }
  for (let x = 1; x <= 8; x++) {
    initialBoardState[`y4x${x}`].piece = false;
    initialBoardState[`y5x${x}`].piece = false;
  }
  const [boardState, setBoardState] = useState(initialBoardState);
  return (
    <>
      <div className="board-container">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => {
          return (
            <div className={`x${row}`} key={`row-${row}`}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((col) => {
                return (
                  <Space
                    setMoveStart={setMoveStart}
                    setMoveEnd={setMoveEnd}
                    setBoardState={() => setBoardState}
                    handleOnDrop={handleOnDrop}
                    handleOnDragOver={handleOnDragOver}
                    coordinates={`y${col}x${row}`}
                    boardState={boardState}
                    handleClick={handleClick}
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

export default Board;
