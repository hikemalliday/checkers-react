import "../css/Piece.css";

interface SpaceType {
  piece: boolean;
  color: string;
  king: boolean;
}

interface Props {
  boardState: Record<string, SpaceType>;
  coordinates: string;
  setMoveStart: (coordinates: string) => void;
}
export const Piece = ({ boardState, coordinates, setMoveStart }: Props) => {
  const handleClick = (coordinates: string) => {
    console.log(`Clicked on <Piece/>: ${coordinates}`);
    setMoveStart(coordinates);
  };

  const pieceClass = `piece-${boardState[coordinates].color}${
    boardState.king ? " king" : ""
  }`;
  return (
    <div
      className={pieceClass}
      onMouseDown={() => handleClick(coordinates)}
      draggable
    ></div>
  );
};

export default Piece;
