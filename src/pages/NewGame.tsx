import React, { useState } from "react";
import Board from "../components/Board";
import GameHeader from "../components/GameHeader";
import "../css/NewGame.css";

interface SpaceType {
  piece: boolean;
  color: string;

  king: boolean;
}

export const NewGame = () => {
  return (
    <>
      <div className="new-game-container">
        <GameHeader />
        <Board />
      </div>
    </>
  );
};

export default NewGame;
