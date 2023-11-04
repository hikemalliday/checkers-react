import React, { useState, useEffect } from "react";
import "../css/Space.css";
import Piece from "./Piece";

interface SpaceType {
  piece: boolean;
  color: string;
  king: boolean;
  isMoveValid: (coordinates: string[]) => boolean;
}

interface Props {
  boardState: Record<string, SpaceType>;
  coordinates: string;
  handleOnDrop: (e: React.DragEvent) => void;
  handleOnDragOver: (e: React.DragEvent) => void;
  handleClick: (e: React.MouseEvent) => void;
}

export const Space = ({
  boardState,
  coordinates,
  handleOnDrop,
  handleClick,
  handleOnDragOver,
}: Props) => {
  return (
    <>
      <div
        className={boardState[coordinates].piece ? "space black" : "space"}
        id={coordinates}
        onMouseDown={(e) => handleClick(e)}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e)}
      >
        {boardState[coordinates].piece && (
          <Piece boardState={boardState} coordinates={coordinates} />
        )}
      </div>
    </>
  );
};

export default Space;

//
// WATCH VIDS ON DRAG / DROP
//
// CODE REGULAR MOVES FIRST, NO JUMPS
//
// yStart, xStart = [coordinates[1], coordinates[3]]
// yEnd, xEnd
// So we need to be able to check both Space + Piece at the same time, everytime
// How do we do this?
// Option A:
//     -Store click methods at child space. This way we have access to both <Space/> / <Piece/>
//     -Do all 'checking' with coordinates plugged into 'boardState' reactive object
//     -So, on <Piece/> level, we check all coordinates and logic, then alter the parents states accordingly
// LOGIC A:
//     -First click stores coordinates 'useState(moveStart)'
//     -Release click stores coordinates 'useState(moveEnd)'
//     -Release click calls 'isMoveValid' logic
//     -If true, boardState[moveEnd].piece = true
//     -If true, boardState[moveEnd].color = boardState[moveStart].color
//     -boardState[moveEnd].piece = true
//     -boardState.[moveStart].piece = false
//     -INSERT to SQL:
//          -moveStart, moveEnd, redScore, blackScore, gameID, turnNumber
//     -player = !player
// What qualifies a 'valid move?':
//     - y: Math.abs(yStart - yEnd) == 1
//     - x: Math.abs(xStart - xEnd) == 1
//     - boardState.moveEnd.piece = false
//     ^^ These are ALWAYS true for a valid move, sans Jump
// PLAYER COLOR RULES:
//     - RED:
//         -yEnd < yStart
//     - BLACK:
//         -xEnd < xStart
// IN SUMMARY:
//     - 'moveStart', 'moveEnd', 'handleClick', and 'handleRelease' are stored / called at '<Space/>' level
//     - Save 'moveStart' on mouse click. If player !== boardState[coordinates].color, do not save 'moveStart'
//     -                                 If boardState[coordinates].piece == false, return
//     - moveStart and moveEnd data is compared against 'boardState'
