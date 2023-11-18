import Space from "../components/Space";
import { useState, useEffect, MutableRefObject } from "react";
import "../css/Board.css";

interface SpaceType {
  color: string | null | undefined;
  king: boolean | null | undefined;
}

type BoardState = {
  [key: string]: SpaceType | null;
};

interface Props {
  activePlayer: string;
  activePlayerRef: MutableRefObject<string>;
  blackScore: number;
  blackScoreRef: MutableRefObject<number>;
  boardState: BoardState;
  initializeBoardState: () => BoardState;
  moveEnd: string[];
  moveEndRef: MutableRefObject<string[]>;
  moveStart: string[];
  moveStartRef: MutableRefObject<string[]>;
  pushGameTurn: () => void;
  redScore: number;
  redScoreRef: MutableRefObject<number>;
  setActivePlayer: React.Dispatch<React.SetStateAction<string>>;
  setBlackScore: React.Dispatch<React.SetStateAction<number>>;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
  setInvalidMove: React.Dispatch<React.SetStateAction<boolean>>;
  setMoveEnd: React.Dispatch<React.SetStateAction<string[]>>;
  setMoveStart: React.Dispatch<React.SetStateAction<string[]>>;
  setRedScore: React.Dispatch<React.SetStateAction<number>>;
  setTurnId: React.Dispatch<React.SetStateAction<number>>;
  turnId: number;
  turnIdRef: MutableRefObject<number>;
}

export const Board = ({
  activePlayer,
  activePlayerRef,
  blackScore,
  blackScoreRef,
  boardState,
  initializeBoardState,
  moveEnd,
  moveEndRef,
  moveStart,
  moveStartRef,
  pushGameTurn,
  redScore,
  redScoreRef,
  setActivePlayer,
  setBlackScore,
  setBoardState,
  setInvalidMove,
  setMoveEnd,
  setMoveStart,
  setRedScore,
  setTurnId,
  turnId,
  turnIdRef,
}: Props) => {
  let spaceColor = "black";

  const [validDoubleJumps, setValidDoubleJumps] = useState<number[][]>([]);

  useEffect(() => {
    if (moveStart[0] !== "" && moveEnd[0] !== "") {
      let boolean;

      if (Math.abs((moveStart[0] as any) - (moveEnd[0] as any)) == 1) {
        // 'move' logic here
        const key = `y${moveStart[0]}x${moveStart[1]}`;
        if (boardState[key]?.king == true) {
          boolean = isMoveValidKing(moveStart, moveEnd);
        } else {
          boolean = isMoveValid(moveStart, moveEnd);
        }
      } else if (Math.abs((moveStart[0] as any) - (moveEnd[0] as any)) == 2) {
        // JUMP CHECK
        let key = `y${moveStart[0]}x${moveStart[1]}`;
        if (boardState[key]?.king == true) {
          boolean = isJumpValidKing(moveStart, moveEnd);
        } else {
          boolean = isJumpValid(moveStart, moveEnd);
        }
        if (boolean) {
          if (activePlayer == "Red") {
            let currentRedScore = redScore + 1;
            setRedScore(currentRedScore);
            redScoreRef.current = currentRedScore;
          } else {
            let currentBlackScore = blackScore + 1;
            setBlackScore(currentBlackScore);
            blackScoreRef.current = currentBlackScore;
          }

          if (boardState[key]?.king == true) {
            const doubleJumpBoolean = checkDoubleJumpKing();
            if (doubleJumpBoolean == true) {
              console.log("double jump pushGameTurn check (king)");
              pushGameTurn();
              return;
            }
          }
          if (boardState[key]?.king == false) {
            const doubleJumpBoolean = checkDoubleJump();
            if (doubleJumpBoolean == true) {
              console.log("double jump pushGameTurn check");
              pushGameTurn();
              return;
            }
          }
        }
      }
      if (boolean) {
        pushGameTurn();
        let turnIdCount = turnId + 1;
        setTurnId(turnIdCount);
        turnIdRef.current = turnIdCount;

        console.log("use effect regular turn check");

        if (activePlayer == "Red") {
          setActivePlayer("Black");
          activePlayerRef.current = "Black";
        } else {
          setActivePlayer("Red");
          activePlayerRef.current = "Red";
        }
      }
    }
    console.log("end of Board.tsx.useEffect()");
  }, [moveEnd]);

  const isMoveValid = (moveStart: string[], moveEnd: string[]) => {
    if (validDoubleJumps.length !== 0) return false;
    let keyMoveStart = `y${moveStart[0]}x${moveStart[1]}`;
    let keyMoveEnd = `y${moveEnd[0]}x${moveEnd[1]}`;
    let x;
    if (activePlayer == "Red") x = 1;
    else x = -1;

    if (boardState[keyMoveStart]?.color !== activePlayer) {
      console.log("color error:");
      setInvalidMove(true);
      return false;
    }

    if (boardState[keyMoveEnd]) {
      console.log("Invalid move, theres a piece in the way");
      setInvalidMove(true);
      return false;
    }

    if (
      (moveStart[0] as any) - (moveEnd[0] as any) == x &&
      Math.abs((moveStart[1] as any) - (moveEnd[1] as any)) == 1 &&
      boardState[keyMoveEnd] == null
    ) {
      let updatedBoardState = { ...boardState };

      updatedBoardState[keyMoveEnd] = {
        color: updatedBoardState[keyMoveStart]?.color,
        king: false,
      };

      updatedBoardState[keyMoveStart] = null;

      setBoardState(updatedBoardState);
    } else {
      console.log("failed movement logic condition");

      setInvalidMove(true);
      return false;
    }
    setInvalidMove(false);
    return true;
  };

  const isMoveValidKing = (moveStart: string[], moveEnd: string[]) => {
    let keyMoveStart = `y${moveStart[0]}x${moveStart[1]}`;
    let keyMoveEnd = `y${moveEnd[0]}x${moveEnd[1]}`;
    if (boardState[keyMoveStart]?.color !== activePlayer) {
      setInvalidMove(true);
      return false;
    }
    if (boardState[keyMoveEnd] !== null) {
      console.log(
        "Invalid move, theres a piece in the way (king movement logic"
      );
      setInvalidMove(true);
      return false;
    }

    if (
      Math.abs((moveStart[0] as any) - (moveEnd[0] as any)) == 1 &&
      Math.abs((moveStart[1] as any) - (moveEnd[1] as any)) == 1 &&
      boardState[keyMoveEnd] == null
    ) {
      let updatedBoardState = { ...boardState };

      updatedBoardState[keyMoveEnd] = {
        color: updatedBoardState[keyMoveStart]?.color,
        king: true,
      };

      updatedBoardState[keyMoveStart] = null;
      setBoardState(updatedBoardState);
    } else {
      console.log("isMoveValidKing movement logic");

      setInvalidMove(true);
      return false;
    }
    setInvalidMove(false);
    return true;
  };

  const isJumpValid = (moveStart: string[], moveEnd: string[]) => {
    let keyMoveStart = `y${moveStart[0]}x${moveStart[1]}`;
    let keyMoveEnd = `y${moveEnd[0]}x${moveEnd[1]}`;
    let moveStartY = parseInt(moveStart[0]);
    let moveStartX = parseInt(moveStart[1]);
    let moveEndY = parseInt(moveEnd[0]);
    let moveEndX = parseInt(moveEnd[1]);
    let x = 0;
    let y = 0;
    let jumpedKing = false;
    let validDoubleJumpsArrayCheck = false;
    if (validDoubleJumps.length !== 0) {
      for (let space of validDoubleJumps) {
        console.log("space: ", space);
        console.log("attempted jump:", moveEndY, moveEndX);
        if (space[0] == moveEndY && space[1] == moveEndX) {
          console.log("valid doubledouble check loop");
          validDoubleJumpsArrayCheck = true;
          break;
        }
      }
      if (validDoubleJumpsArrayCheck == false) {
        console.log("validDoubleJumpsArrayCheck: false");
        return false;
      }
    }

    let updatedBoardState = { ...boardState };
    if (activePlayer == "Red") {
      x = 2;
      y = -1;
    } else {
      x = -2;
      y = 1;
    }

    let leftPieceKey = `y${moveStartY + y}x${moveStartX - 1}`;
    let rightPieceKey = `y${moveStartY + y}x${moveStartX + 1}`;

    if (boardState[keyMoveStart]?.color !== activePlayer) {
      console.log("isJumpValid(): color error");

      setInvalidMove(true);
      return false;
    }

    if (boardState[keyMoveEnd]) {
      console.log("isJumpValid(): piece in the way");

      setInvalidMove(true);
      return false;
    }

    if (
      (moveStart[0] as any) - (moveEnd[0] as any) == x &&
      Math.abs((moveStart[1] as any) - (moveEnd[1] as any)) == 2 &&
      boardState[keyMoveEnd] == null
    ) {
      if ((moveStart[1] as any) - (moveEnd[1] as any) > 0) {
        if (boardState[leftPieceKey]?.color !== activePlayer) {
          // If we jump a king, upgrade to king:
          if (boardState[leftPieceKey]?.king) jumpedKing = true;
          updatedBoardState[leftPieceKey] = null;
        }
      } else if ((moveStart[1] as any) - (moveEnd[1] as any) < 0) {
        if (boardState[rightPieceKey]?.color !== activePlayer) {
          // If we jump a king, upgrade to king:
          if (boardState[rightPieceKey]?.king) jumpedKing = true;
          updatedBoardState[rightPieceKey] = null;
        }
      }

      updatedBoardState[keyMoveEnd] = {
        color: updatedBoardState[keyMoveStart]?.color,
        king: jumpedKing,
      };

      updatedBoardState[keyMoveStart] = null;
      setBoardState(updatedBoardState);
      console.log("isValidJump keyMoveEnd:", keyMoveEnd);
    }
    return true;
  };

  const checkDoubleJump = () => {
    setValidDoubleJumps([]);
    let coordinates = `y${moveEnd[0]}x${moveEnd[1]}`;
    console.log("coordinates: ", coordinates);

    let moveStartY = parseInt(moveEnd[0]);
    let moveStartX = parseInt(moveEnd[1]);

    let x = 0;
    let y = 0;
    let possibleJumps = [];

    if (activePlayer == "Red") {
      x = -2;
      y = -1;
    } else {
      x = 2;
      y = 1;
    }

    let leftPieceKey = `y${moveStartY + y}x${moveStartX - 1}`;
    let rightPieceKey = `y${moveStartY + y}x${moveStartX + 1}`;
    let leftSpaceKey = `y${moveStartY + x}x${moveStartX - 2}`;
    let rightSpaceKey = `y${moveStartY + x}x${moveStartX + 2}`;

    if (
      boardState[leftPieceKey] &&
      boardState[leftPieceKey]?.color !== activePlayer &&
      boardState[leftSpaceKey] == null
    ) {
      // CHECK LEFT
      // Out of bounds check
      if (
        moveStartY + x !== 0 &&
        moveStartY + x !== 9 &&
        moveStartX - 2 !== 0 &&
        moveStartX - 2 !== 9
      ) {
        possibleJumps.push([moveStartY + x, moveStartX - 2]);
      }
    }
    if (
      boardState[rightPieceKey] &&
      boardState[rightPieceKey]?.color !== activePlayer &&
      boardState[rightSpaceKey] == null
    ) {
      // CHECK RIGHT
      // Out of bounds check
      if (
        moveStartY + x !== 0 &&
        moveStartY + x !== 9 &&
        moveStartX + 2 !== 0 &&
        moveStartX + 2 !== 9
      ) {
        possibleJumps.push([moveStartY + x, moveStartX + 2]);
      }
    }
    setValidDoubleJumps([...possibleJumps]);
    console.log("possibleJumps", possibleJumps);

    if (possibleJumps.length !== 0) return true;
    return false;
  };

  const isJumpValidKing = (moveStart: string[], moveEnd: string[]) => {
    // Need to iterate over 'validDoubleJumps' array, and if the array has length, and our jump is not in it, then return false;

    let keyMoveStart = `y${moveStart[0]}x${moveStart[1]}`;
    let keyMoveEnd = `y${moveEnd[0]}x${moveEnd[1]}`;
    let moveStartY = parseInt(moveStart[0]);
    let moveStartX = parseInt(moveStart[1]);
    let moveEndY = parseInt(moveEnd[0]);
    let moveEndX = parseInt(moveEnd[1]);
    let validDoubleJumpsArrayCheck = false;
    if (validDoubleJumps.length !== 0) {
      console.log("validDoubleJumps:", validDoubleJumps);
      for (let space of validDoubleJumps) {
        console.log("space: ", space);
        console.log("attempted jump:", moveEndY, moveEndX);
        if (space[0] == moveEndY && space[1] == moveEndX) {
          console.log("valid doubledouble check loop");
          validDoubleJumpsArrayCheck = true;
          break;
        }
      }
      if (validDoubleJumpsArrayCheck == false) {
        console.log("validDoubleJumpsArrayCheck: false");
        return false;
      }
    }
    let updatedBoardState = { ...boardState };

    let upLeftPieceKey = `y${moveStartY - 1}x${moveStartX - 1}`;
    let upRightPieceKey = `y${moveStartY - 1}x${moveStartX + 1}`;
    let downLeftPieceKey = `y${moveStartY + 1}x${moveStartX - 1}`;
    let downRightPieceKey = `y${moveStartY + 1}x${moveStartX + 1}`;

    if (boardState[keyMoveStart]?.color !== activePlayer) {
      console.log("isValidJumpKing(): color error");

      setInvalidMove(true);
      return false;
    }

    if (boardState[keyMoveEnd]) {
      console.log("isValidJumpKing(): piece in the way");

      setInvalidMove(true);
      return false;
    }

    if (
      Math.abs((moveStart[0] as any) - (moveEnd[0] as any)) == 2 &&
      Math.abs((moveStart[1] as any) - (moveEnd[1] as any)) == 2 &&
      boardState[keyMoveEnd] == null
    ) {
      // UPLEFT:
      if (
        (moveStart[0] as any) - (moveEnd[0] as any) == 2 &&
        (moveStart[1] as any) - (moveEnd[1] as any) == 2
      ) {
        if (boardState[upLeftPieceKey]?.color !== activePlayer) {
          // Valid jump found
          updatedBoardState[upLeftPieceKey] = null;
        }
      }
      // UPRIGHT:
      else if (
        (moveStart[0] as any) - (moveEnd[0] as any) == 2 &&
        (moveStart[1] as any) - (moveEnd[1] as any) == -2
      ) {
        if (boardState[upRightPieceKey]?.color !== activePlayer) {
          // Valid jump found
          updatedBoardState[upRightPieceKey] = null;
        }
      }
      // DOWNLEFT:
      else if (
        (moveStart[0] as any) - (moveEnd[0] as any) == -2 &&
        (moveStart[1] as any) - (moveEnd[1] as any) == 2
      ) {
        if (boardState[downLeftPieceKey]?.color !== activePlayer) {
          // Valid jump found
          updatedBoardState[downLeftPieceKey] = null;
        }
      }
      // DOWNRIGHT
      else if (
        (moveStart[0] as any) - (moveEnd[0] as any) == -2 &&
        (moveStart[1] as any) - (moveEnd[1] as any) == -2
      ) {
        if (boardState[downRightPieceKey]?.color !== activePlayer) {
          // Valid jump found
          updatedBoardState[downRightPieceKey] = null;
        }
      }

      updatedBoardState[keyMoveEnd] = {
        color: updatedBoardState[keyMoveStart]?.color,
        king: true,
      };

      updatedBoardState[keyMoveStart] = null;
      setBoardState(updatedBoardState);

      return true;
    }
  };

  const checkDoubleJumpKing = () => {
    setValidDoubleJumps([]);

    let moveStartY = parseInt(moveEnd[0]);
    let moveStartX = parseInt(moveEnd[1]);
    console.log("checkDoubleJumpKing");
    console.log(moveStartY, moveStartX);

    let possibleJumps = [];

    let upLeftPieceKey = `y${moveStartY - 1}x${moveStartX - 1}`;
    let upRightPieceKey = `y${moveStartY - 1}x${moveStartX + 1}`;
    let downLeftPieceKey = `y${moveStartY + 1}x${moveStartX - 1}`;
    let downRightPieceKey = `y${moveStartY + 1}x${moveStartX + 1}`;

    let upLeftSpaceKey = `y${moveStartY - 2}x${moveStartX - 2}`;
    let upRightSpaceKey = `y${moveStartY - 2}x${moveStartX + 2}`;
    let downLeftSpaceKey = `y${moveStartY + 2}x${moveStartX - 2}`;
    let downRightSpaceKey = `y${moveStartY + 2}x${moveStartX + 2}`;

    // CHECK UP LEFT
    // Out of bounds check

    if (
      boardState[upLeftPieceKey] &&
      boardState[upLeftPieceKey]?.color !== activePlayer &&
      boardState[upLeftSpaceKey] == null
    ) {
      if (moveStartY - 2 !== 0 && moveStartX - 2 !== 0) {
        console.log("up left");
        possibleJumps.push([moveStartY - 2, moveStartX - 2]);
      }
      // CHECK UP RIGHT
      // Out of bounds check
    }
    if (
      boardState[upRightPieceKey] &&
      boardState[upRightPieceKey]?.color !== activePlayer &&
      boardState[upRightSpaceKey] == null
    ) {
      if (moveStartY - 2 !== 0 && moveStartX + 2 !== 9) {
        console.log("up right");
        console.log([moveStartY - 2, moveStartX + 2]);
        possibleJumps.push([moveStartY - 2, moveStartX + 2]);
      }
    }
    // CHECK DOWN LEFT
    // Out of bounds check
    if (
      boardState[downLeftPieceKey] &&
      boardState[downLeftPieceKey]?.color !== activePlayer &&
      boardState[downLeftSpaceKey] == null
    ) {
      if (moveStartY - 2 !== 9 && moveStartX - 2 !== 0) {
        console.log("down left");
        console.log([moveStartY + 2, moveStartX - 2]);
        possibleJumps.push([moveStartY + 2, moveStartX - 2]);
      }
    }
    // CHECK DOWN RIGHT
    // Out of bounds check
    if (
      boardState[downRightPieceKey] &&
      boardState[downRightPieceKey]?.color !== activePlayer &&
      boardState[downRightSpaceKey] == null
    ) {
      if (moveStartY + 2 !== 9 && moveStartX + 2 !== 9) {
        console.log("down right");
        console.log([moveStartY + 2, moveStartX + 2]);
        possibleJumps.push([moveStartY + 2, moveStartX + 2]);
      }
    }
    setValidDoubleJumps(possibleJumps);
    console.log(possibleJumps);
    if (possibleJumps.length !== 0) {
      console.log("true");
      return true;
    }
    console.log("false");
    return false;
  };

  const handleClick = (e: React.MouseEvent) => {
    const targetId = e.currentTarget.id as string;
    const targetIdArray = [...targetId[1], targetId[3]];
    setMoveStart(targetIdArray);
    moveStartRef.current = targetIdArray;
    console.log("moveStart array, handleClick:");
    console.log("moveStartRef", moveStartRef.current);
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleOnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target && target.id) {
      const targetId = target.id;
      const targetIdArray = [...targetId[1], targetId[3]];
      setMoveEnd(targetIdArray);
      moveEndRef.current = targetIdArray;
      console.log("moveEnd Array, handleOnDrop:");
      console.log("moveEndRef", moveEndRef.current);
    }
  };

  useEffect(() => {
    setBoardState(initializeBoardState());
  }, []);

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
                  <Space
                    setBoardState={setBoardState}
                    spaceColor={spaceColor}
                    boardState={boardState}
                    coordinates={`y${col}x${row}`}
                    handleOnDrop={handleOnDrop}
                    handleOnDragOver={handleOnDragOver}
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
