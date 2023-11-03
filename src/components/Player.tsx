import { useState } from "react";
import "../css/Player.css";

export const Player = () => {
  const [currentPlayer, setCurrentPlayer] = useState("Red");
  const currentPlayerColor =
    currentPlayer == "Black" ? "black-player" : "red-player";
  return (
    <div>
      Player: <span className={currentPlayerColor}>{currentPlayer}</span>
    </div>
  );
};

export default Player;
