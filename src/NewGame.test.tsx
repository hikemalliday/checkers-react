// import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe } from "@jest/globals";
import "@testing-library/jest-dom";
import "./App";

import NewGame from "./pages/NewGame";

interface SpaceType {
  color: string | null | undefined;
  king: boolean | null | undefined;
}

type BoardState = {
  [key: string]: SpaceType | null;
};
const initializeBoardState = () => {
  const newBoardState: BoardState = {};

  for (let y = 1; y <= 8; y++) {
    const isBlackRow = y % 2 === 1;

    for (let x = 1; x <= 8; x++) {
      const isBlackSpace = isBlackRow ? x % 2 === 1 : x % 2 === 0;
      const key = `y${y}x${x}`;
      if (y < 5) {
        if (isBlackSpace)
          newBoardState[key] = {
            color: "Black",
            king: false,
          };
      } else if (isBlackSpace)
        newBoardState[key] = { color: "Red", king: false };
    }
  }

  for (let x = 1; x <= 8; x++) {
    newBoardState[`y4x${x}`] = null;
    newBoardState[`y5x${x}`] = null;
  }

  return newBoardState;
};

// const appMock = jest.mock("./App");

describe("Move Piece", () => {
  it("should render a piece in a spot if move is valid", async () => {
    // const mockSetState = jest.fn();
    // (useState as jest.Mock).mockReturnValueOnce([
    //   initializeBoardState(),
    //   mockSetState,
    // ]);
    // We should click 2 spaces and check if the correct data is being passed into a function
    render(
      <NewGame
        boardState={initializeBoardState()}
        initializeBoardState={initializeBoardState}
        setBoardState={() => console.log("test")}
        exportReplayfunc={() => console.log("exportReplayFunc")}
      />
    );

    const startingSpace = screen.getByTestId("y3x7");
    const startingPiece = startingSpace.children[0] as HTMLElement;
    const endingSpace = screen.getByTestId("y4x8");
    console.log("startingSpace", startingSpace);
    // const startingPieceFirstChild = startingPiece.firstChild as HTMLElement;

    // const startingPieceColor = startingPieceFirstChild
    //   ? startingPieceFirstChild.classList
    //   : null;
    // console.log("startingPieceColor", startingPieceColor);

    fireEvent.mouseDown(startingPiece);
    fireEvent.dragOver(endingSpace);
    fireEvent.drop(endingSpace);

    setTimeout(() => console.log("setTimeout"), 10000);

    // const endingSpaceFirstChild = endingSpace.children[0] as HTMLElement;

    console.log("endingSpace", endingSpace);
    // const endingSpaceColor = endingSpaceFirstChild
    //   ? endingSpaceFirstChild.classList
    //   : null;
    // console.log("endingSpaceFirstChild", endingSpaceFirstChild);
    // console.log("endingSpaceColor", endingSpaceColor);
    // console.log(endingSpace.children);

    // We now need yo 'expect' of the piece inside the space to be of the same color of what we dragged
  });
});
