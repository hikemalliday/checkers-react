import { useState, useRef, MutableRefObject } from "react";
import Board from "../components/Board";
import GameHeader from "../components/GameHeader";
import "../css/NewGame.css";

interface GameTurn {
  turn_id: number;
  red_score: number;
  black_score: number;
  active_player: string;
  move_start: string;
  move_end: string;
}

interface SpaceType {
  color: string | null | undefined;
  king: boolean | null | undefined;
}

type BoardState = {
  [key: string]: SpaceType | null;
};
interface Props {
  boardState: BoardState;
  exportReplayfunc: (replay: GameTurn[]) => void;
  initializeBoardState: () => BoardState;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
}

export const NewGame = ({
  boardState,
  exportReplayfunc,
  initializeBoardState,
  setBoardState,
}: Props) => {
  const [activePlayer, setActivePlayer] = useState<string>("Black");
  const [blackScore, setBlackScore] = useState<number>(0);
  const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);
  const [invalidMove, setInvalidMove] = useState<boolean>(false);
  const [moveEnd, setMoveEnd] = useState<string[]>(["", ""]);
  const [moveStart, setMoveStart] = useState<string[]>(["", ""]);
  const [redScore, setRedScore] = useState<number>(0);
  const [turnId, setTurnId] = useState<number>(1);
  const activePlayerRef: MutableRefObject<string> = useRef<string>("Black");
  const blackScoreRef: MutableRefObject<number> = useRef<number>(0);
  const moveEndRef: MutableRefObject<string[]> = useRef<string[]>(["", ""]);
  const moveStartRef: MutableRefObject<string[]> = useRef<string[]>(["", ""]);
  const redScoreRef: MutableRefObject<number> = useRef<number>(0);
  const turnIdRef: MutableRefObject<number> = useRef<number>(1);

  const pushGameTurn = () => {
    const moveStartString = `y${moveStartRef.current[0]}x${moveStartRef.current[1]}`;
    const moveEndString = `y${moveEndRef.current[0]}x${moveEndRef.current[1]}`;
    const turn = {
      turn_id: turnIdRef.current,
      red_score: redScoreRef.current,
      black_score: blackScoreRef.current,
      active_player: activePlayerRef.current,
      move_start: moveStartString,
      move_end: moveEndString,
    };

    console.log(turn);
    const updatedGameTurns = [...gameTurns, turn];

    setGameTurns(updatedGameTurns);
  };

  return (
    <>
      <div className="new-game-container">
        <GameHeader
          activePlayer={activePlayer}
          blackScore={blackScore}
          exportReplayfunc={exportReplayfunc}
          gameTurns={gameTurns}
          invalidMove={invalidMove}
          redScore={redScore}
          turnId={turnId}
        />
        <Board
          activePlayer={activePlayer}
          activePlayerRef={activePlayerRef}
          blackScore={blackScore}
          blackScoreRef={blackScoreRef}
          boardState={boardState}
          initializeBoardState={initializeBoardState}
          moveEnd={moveEnd}
          moveEndRef={moveEndRef}
          moveStart={moveStart}
          moveStartRef={moveStartRef}
          pushGameTurn={pushGameTurn}
          redScore={redScore}
          redScoreRef={redScoreRef}
          setActivePlayer={setActivePlayer}
          setBlackScore={setBlackScore}
          setBoardState={setBoardState}
          setInvalidMove={setInvalidMove}
          setMoveEnd={setMoveEnd}
          setMoveStart={setMoveStart}
          setRedScore={setRedScore}
          setTurnId={setTurnId}
          turnId={turnId}
          turnIdRef={turnIdRef}
        />
      </div>
    </>
  );
};

export default NewGame;
