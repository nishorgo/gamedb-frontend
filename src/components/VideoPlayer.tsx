import YouTube from 'react-youtube';

interface Props {
    videoId: string;
}

const VideoPlayer = ({ videoId }: Props) => {
  const opts = {
    height: '640',
    width: '1190',
    playerVars: {
      autoplay: 0,
      controls: 1,
      color: 'white',
    },
  };

  return (
    <YouTube videoId={videoId} opts={opts} />
  );
};

export default VideoPlayer;
