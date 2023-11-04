import "../css/Piece.css";

interface SpaceType {
  piece: boolean;
  color: string;
  king: boolean;
}

interface Props {
  boardState: Record<string, SpaceType>;
  coordinates: string;

  // setMoveStart: (coordinates: string[]) => void;
}
export const Piece = ({ boardState, coordinates }: Props) => {
  // const handleClick = (coordinates: string) => {
  //   console.log(`Clicked on <Piece/>: ${coordinates}`);
  //   console.log("Piece.tsx:", coordinates);
  //   let coordinates_array = [coordinates[1], coordinates[3]];

  //   // setMoveStart(coordinates_array);
  // };

  const pieceClass = `piece-${boardState[coordinates].color}${
    boardState.king ? " king" : ""
  }`;
  return (
    <div
      className={pieceClass}
      // onMouseDown={() => handleClick(coordinates)}
      draggable
    ></div>
  );
};

export default Piece;
