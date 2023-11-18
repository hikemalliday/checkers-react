import React, { useEffect } from "react";
import "../css/Space.css";
import Piece from "./Piece";

interface SpaceType {
  color: string | null | undefined;
  king: boolean | null | undefined;
}

type BoardState = {
  [key: string]: SpaceType | null;
};

interface Props {
  boardState: Record<string, SpaceType | null>;
  coordinates: string;
  spaceColor: string;
  handleOnDrop: (e: React.DragEvent) => void;
  handleOnDragOver: (e: React.DragEvent) => void;
  handleClick: (e: React.MouseEvent) => void;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
}

export const Space = ({
  spaceColor,
  boardState,
  coordinates,
  handleOnDrop,
  handleClick,
  handleOnDragOver,
  setBoardState,
}: Props) => {
  useEffect(() => {
    // Check if the conditions are met

    const updatedBoardState = { ...boardState };
    const space = boardState[coordinates];
    const updatedSpace = updatedBoardState[coordinates];
    if (
      coordinates[1] === "1" &&
      space &&
      space.color === "Red" &&
      space.king === false
    ) {
      // Set king to true
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
      // Set king to true
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
        data-testid={coordinates}
        onMouseDown={(e) => handleClick(e)}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e)}
      >
        {boardState[coordinates] && (
          <Piece boardState={boardState} coordinates={coordinates} />
        )}
      </div>
    </>
  );
};

export default Space;
