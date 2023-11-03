import { useState } from "react";
import "../css/Score.css";

export const Score = () => {
  const [blackScore, setBlackScore] = useState(0);
  const [redScore, setRedScore] = useState(0);
  return (
    <>
      <div className="score-container">
        <div className="score-div">Score:</div>
        <div>Black: {blackScore}</div>
        <div>Red: {redScore}</div>
      </div>
    </>
  );
};

export default Score;
