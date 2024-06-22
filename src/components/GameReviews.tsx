import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import ReviewForm from "../forms/ReviewForm";
import useDeleteReview from "../hooks/useDeleteReview";
import useReviews from "../hooks/useReviews";
import { useAuthStore } from "../stores/authStore";
import DeleteAlertWindow from "./DeleteAlertWindow";
import ExpandableText from "./ExpandableText";

interface Props {
  gameId: number;
}

const GameReviews = ({ gameId }: Props) => {
  const { data, isLoading, error } = useReviews(gameId);
  const deleteReview = useDeleteReview(gameId);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const currentUser = useAuthStore((s) => s.username);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);
  const hasExistingReview = data?.results.some(
    (review) => review.username === currentUser
  );

  const handleDelete = (reviewId: number) => {
    setReviewToDelete(reviewId);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    if (reviewToDelete) {
      deleteReview.mutate(reviewToDelete);
      setDialogOpen(false);
    }
  };

  if (isLoading) return null;
  if (error) throw error;

  return (
    <>
      {!hasExistingReview && isAuthenticated && (
        <Box marginBottom={5}>
          <ReviewForm gameId={gameId} />
        </Box>
      )}

      {data && data.results
        ? data.results.map((review) => (
            <Card
              key={review.id}
              marginBottom={5}
              borderColor="teal"
              borderWidth={2}
              borderRadius={10}
            >
              <CardHeader>
                <Flex marginBottom={2}>
                  <Heading size="md">{review.username}</Heading>
                  {currentUser === review.username && (
                    <>
                      <Spacer />
                      <ButtonGroup gap="2">
                        <Button
                          leftIcon={<EditIcon />}
                          colorScheme="teal"
                          variant="outline"
                          size="sm"
                          _hover={{ bg: "#319795", color: "white" }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(review.id)}
                          leftIcon={<DeleteIcon />}
                          colorScheme="red"
                          variant="solid"
                          size="sm"
                          _hover={{ bg: "#C53030", color: "white" }}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </>
                  )}
                </Flex>


                <HStack justifyContent="space-between" marginBottom={3}>
                  <Heading size="lg">{review.review_title}</Heading>
                  <Heading size="lg">{review.rating}/10</Heading>
                </HStack>
                <Divider />
              </CardHeader>

              <CardBody>
                <ExpandableText>{review.review_body}</ExpandableText>
              </CardBody>
            </Card>
          ))
          : null}
          
      <DeleteAlertWindow
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={confirmDelete}
      />
      
    </>
  );
};

export default GameReviews;
