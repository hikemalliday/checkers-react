import "../css/Piece.css";

interface SpaceType {
  color: string | null | undefined;
  king: boolean | null | undefined;
}

type BoardState = {
  [key: string]: SpaceType | null;
};

interface Props {
  boardState: BoardState;
  coordinates: string;
}

export const Piece = ({ boardState, coordinates }: Props) => {
  const pieceClass = `piece-${boardState[coordinates]?.color}${
    boardState[coordinates]?.king ? "-king" : ""
  }`;
  return <div className={pieceClass} draggable></div>;
};

export default Piece;
