import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NewGame from "./pages/NewGame";
import Replay from "./pages/Replay";
import axios from "axios";
import "./App.css";
import config from "../config.js";

let apiUrl = import.meta.env.VITE_APP_SERVER_URL;

if (import.meta.env.VITE_APP_HOST_NAME === "LOCAL")
  apiUrl = import.meta.env.VITE_APP_LOCAL_URL;

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

function App() {
  const timestamp = new Date();
  const [gameIds, setGameIds] = useState<any[][]>([]);
  const [selectedReplay, setSelectedReplay] = useState<any[][]>([]);
  const [boardState, setBoardState] = useState<BoardState>({});

  const exportReplayfunc = async (replay: GameTurn[]) => {
    const url = `${apiUrl}export_replay`;
    const timestampUnix = timestamp.getTime();
    const date = new Date(timestampUnix);
    const formattedDate = date.toLocaleString();

    const body = {
      data: [] as GameTurn[],
      winner: null,
      date: formattedDate,
    };

    body.data = replay;

    try {
      await axios.post(url, body);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchGameIds = async () => {
    const url = `${apiUrl}fetch_game_ids`;
    console.log("test fetch game ids2", apiUrl);
    try {
      const results = await axios.get(url);
      console.log(results.data);
      return results.data;
    } catch (err) {
      console.log(err);
    }
  };
  // Could possible refactor this to RETURN the results, then pass 'fetchReplay' inside setSelectedReplay
  const fetchReplay = async (gameId: number) => {
    const url = `${apiUrl}fetch_replays`;
    if (!gameId) gameId = 0;
    try {
      const body = { game_id: gameId };
      const results = await axios.post(url, body);
      console.log(results.data);
      setSelectedReplay(results.data);
    } catch (err) {
      console.log(err);
    }
    // If we pass a 0, the frontend will interpret that to fetch all
  };

  const deleteGame = async (gameId: number) => {
    const url = `${apiUrl}delete_game`;
    try {
      const body = { game_id: gameId };
      const results = await axios.post(url, body);
      console.log(results);
      setGameIds((prevGameIds) =>
        prevGameIds.filter((arr) => !arr.includes(gameId))
      );
    } catch (err) {
      console.log(err);
    }
    // If we pass a 0, the frontend will interpret that to fetch all
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

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/new_game"
            element={
              <NewGame
                boardState={boardState}
                setBoardState={setBoardState}
                initializeBoardState={initializeBoardState}
                exportReplayfunc={exportReplayfunc}
              />
            }
          />
          <Route
            path="/replay"
            element={
              <Replay
                deleteGame={deleteGame}
                boardState={boardState}
                setBoardState={setBoardState}
                initializeBoardState={initializeBoardState}
                fetchGameIds={fetchGameIds}
                setGameIds={setGameIds}
                fetchReplay={fetchReplay}
                gameIds={gameIds}
                selectedReplay={selectedReplay}
                setSelectedReplay={setSelectedReplay}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
