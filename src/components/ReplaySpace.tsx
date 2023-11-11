import React, { useEffect } from "react";
import Piece from "./Piece";

interface SpaceType {
  color: string | null | undefined;
  king: boolean | null | undefined;
}

type BoardState = {
  [key: string]: SpaceType | null;
};

interface Props {
  boardState: BoardState;
  coordinates: string;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
  spaceColor: string;
}

export const ReplaySpace = ({
  boardState,
  coordinates,
  setBoardState,
  spaceColor,
}: Props) => {
  useEffect(() => {
    console.log("Space.tsx, debug for king conversion");
    // Check if the conditions are met
    const updatedBoardState: BoardState = { ...boardState };
    const space = boardState[coordinates];
    const updatedSpace = updatedBoardState[coordinates];
    if (
      coordinates[1] === "1" &&
      space &&
      space.color === "Red" &&
      space.king === false
    ) {
      // Update the boardState to set king to true
      if (updatedSpace) {
        updatedSpace.king = true;
        setBoardState(updatedBoardState);
      }
    }
    if (
      coordinates[1] === "8" &&
      space &&
      space.color === "Black" &&
      space.king === false
    ) {
      // Update the boardState to set king to true
      if (updatedSpace) {
        updatedSpace.king = true;
        setBoardState(updatedBoardState);
      }
    }
  }, [coordinates, boardState]);
  return (
    <>
      <div
        className={spaceColor == "black" ? "space black" : "space"}
        id={coordinates}
      >
        {boardState[coordinates] && (
          <Piece boardState={boardState} coordinates={coordinates} />
        )}
      </div>
    </>
  );
};

export default ReplaySpace;
