interface Props {
  turnId: number;
}

export const TurnId = ({ turnId }: Props) => {
  return <div>Turn #: {turnId} </div>;
};

export default TurnId;
