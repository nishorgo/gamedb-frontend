import useTrailers from "../hooks/useTrailers";

interface Props {
  trailerLink: string;
}

const GameTrailer = ({ trailerLink }: Props) => {

  return trailerLink ? (
    <video
        src={trailerLink} 
        controls 
    />
  ) : null;
};

export default GameTrailer;
