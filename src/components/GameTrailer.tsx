import VideoPlayer from "./VideoPlayer";

interface Props {
  trailerLink: string;
}

const GameTrailer = ({ trailerLink }: Props) => {

  return trailerLink ? (
    <VideoPlayer videoId={trailerLink} />
  ) : null;
};

export default GameTrailer;
