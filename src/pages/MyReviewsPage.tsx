import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Link as ChakraLink,
  Divider,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom';
import useMyReviews from "../hooks/useMyReviews";

const MyReviewsPage = () => {
  const { data, isLoading, error } = useMyReviews();

  if (isLoading) return null;
  if (error) throw error;

  return (
    <Box marginX={5}>
      <Heading marginBottom={5}>Your Reviews</Heading>
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
                  <ChakraLink as={ReactRouterLink} to={`/games/${review.game_id}`}>
                    <Heading size="md">{review.game_title}</Heading>
                  </ChakraLink>
                  <Heading size="lg">{review.rating}/10</Heading>
                </HStack>
                <Heading size="lg">{review.review_title}</Heading>
                <Divider marginTop={5}  />
              </CardHeader>

              <CardBody>
                <Text pt="2" fontSize="md">
                  {review.review_body}
                </Text>
              </CardBody>
            </Card>
          ))
        : null}
    </Box>
  );
};

export default MyReviewsPage;
