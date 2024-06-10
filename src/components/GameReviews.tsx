import React, { useState } from "react";
import useReviews from "../hooks/useReviews";
import {
  Box,
  Text,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  HStack,
} from "@chakra-ui/react";
import { useAuthStore } from "../stores/authStore";
import ReviewForm from "../forms/ReviewForm";

interface Props {
  gameId: number;
}

const GameReviews = ({ gameId }: Props) => {
  const { data, isLoading, error } = useReviews(gameId);
  const currentUser = useAuthStore((s) => s.username);
  const hasExistingReview = data?.results.some(
    (review) => review.username === currentUser
  );
  console.log(hasExistingReview);

  if (isLoading) return null;
  if (error) throw error;

  return (
    <>
      {!hasExistingReview && (
        <Box marginBottom={5}>
          <ReviewForm gameId={gameId} />
        </Box>
      )}

      {data && data.results
        ? data.results.map((review) => (
            <Card
              marginBottom={5}
              borderColor="teal"
              borderWidth={2}
              borderRadius={10}
            >
              <CardHeader>
                <HStack justifyContent="space-between">
                  <Heading size="md">{review.username}</Heading>
                  <Heading size="lg">{review.rating}/10</Heading>
                </HStack>
                <Heading size="lg">{review.review_title}</Heading>
              </CardHeader>

              <CardBody>
                <Text pt="2" fontSize="md">
                  {review.review_body}
                </Text>
              </CardBody>
            </Card>
          ))
        : null}
    </>
  );
};

export default GameReviews;
