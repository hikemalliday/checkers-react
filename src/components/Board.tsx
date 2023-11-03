import Space from "../components/Space";
import { useState } from "react";
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
                    coordinates={`y${col}x${row}`}
                    boardState={boardState}
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
