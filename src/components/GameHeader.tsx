import React from "react";
import Score from "./Score";
import Player from "./Player";
import ExportReplay from "../buttons/ExportReplay";
import "../css/GameHeader.css";

export const GameHeader = () => {
  return (
    <div className="game-header-container">
      <Score />
      <Player />
      <ExportReplay />
    </div>
  );
};

export default GameHeader;
