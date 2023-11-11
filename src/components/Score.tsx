import "../css/Score.css";

interface Props {
  redScore: number;
  blackScore: number;
}

export const Score = ({ redScore, blackScore }: Props) => {
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
