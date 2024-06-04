import { Box, GridItem, HStack, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameReviews from "../components/GameReviews";
import GameScreenshots from "../components/GameScreenshots";
import GameTrailer from "../components/GameTrailer";
import useGame from "../hooks/useGame";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);

  if (isLoading) return <Spinner />;
  if (error || !game) throw error;

  return (
    <Box margin={10}>
      <Box>
        <SimpleGrid columns={2} justifyContent={"space-between"}>
          <Heading>{game.title}</Heading>
          <Heading>{game.average_rating}/10</Heading>
        </SimpleGrid>
        <ExpandableText>{game.description}</ExpandableText>
        <GameAttributes game={game} />
        <GameTrailer trailerLink={game.trailer} />
      </Box>

      <Box marginBottom={5}>
          <GameScreenshots gameId={game.id} />
      </Box>

      <GameReviews gameId={game.id} />
    </Box>
  );
};

export default GameDetailPage;
