import { AddIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameReviews from "../components/GameReviews";
import GameScreenshots from "../components/GameScreenshots";
import GameTrailer from "../components/GameTrailer";
import useAddtoWishList from "../hooks/useAddToWishList";
import useDeleteFromWishlist from "../hooks/useDeleteFromWIshlist";
import useGame from "../hooks/useGame";
import useIsInWishlist from "../hooks/useIsInWishlist";
import { useAuthStore } from "../stores/authStore";
import { useQueryClient } from "@tanstack/react-query";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);
  const { data: isInWishlistInitial, isLoading: isInWishlistLoading } = useIsInWishlist(slug!);
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [isInWishlist, setIsInWishlist] = useState(isInWishlistInitial?.is_in_wishlist);
  const addToWishList = useAddtoWishList(() => {
    setIsInWishlist(true);
    queryClient.invalidateQueries(['is_in_wishlist', slug]);
  });
  const deleteFromWishList = useDeleteFromWishlist(() => {
    setIsInWishlist(false);
    queryClient.invalidateQueries(['is_in_wishlist', slug]);
  });

  if (isLoading) return <Spinner />;
  if (error || !game) throw error;

  return (
    <Box marginX={10}>
        <SimpleGrid columns={2} justifyContent={"space-between"}>
          <HStack>
            <Heading marginEnd={5}>{game.title}</Heading>
            {isAuthenticated && (
              isInWishlist ? 
              <Button
                variant="solid"
                colorScheme="teal"
                aria-label="Call Segun"
                fontSize="16px"
                size="xs"
                leftIcon={<CheckCircleIcon />}
                _hover={{ bg: "#2C7A7B", color: "white" }}
                onClick={() => {
                  if (isInWishlistInitial)
                    deleteFromWishList.mutate(isInWishlistInitial.wishlist_id)} 
                }
              >
                In Wishlist
              </Button> :
              <Button
                variant="outline"
                colorScheme="teal"
                aria-label="Call Segun"
                fontSize="16px"
                size="xs"
                leftIcon={<AddIcon />}
                _hover={{ bg: "#2C7A7B", color: "white" }}
                onClick={() => addToWishList.mutate({ game: game.id })}
              >
                Add to Wishlist
              </Button>
            )}
          </HStack>
          <Heading>{game.average_rating?.toFixed(1)}/10</Heading>
        </SimpleGrid>
        <Box marginTop={5}>
          <ExpandableText>{game.description}</ExpandableText>
        </Box>
        <GameAttributes game={game} />
        <GameTrailer trailerLink={game.trailer} />

      <Box marginY={5}>
        <GameScreenshots gameId={game.id} />
      </Box>
      <Heading size={"lg"} marginBottom={5}>
        Reviews
      </Heading>
      <GameReviews gameId={game.id} />
    </Box>
  );
};

export default GameDetailPage;
