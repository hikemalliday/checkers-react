import "../css/Player.css";

interface Props {
  activePlayer: string;
}

export const Player = ({ activePlayer }: Props) => {
  return (
    <div className="player-container">
      <span className="player-label">Player:</span>{" "}
      <span className={`${activePlayer}-player`}>{activePlayer}</span>
    </div>
  );
};

export default Player;
