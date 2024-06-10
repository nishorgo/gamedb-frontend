import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { z } from "zod";
import usePostReview from "../hooks/usePostReview";

interface Props {
    gameId: number;
  }

const schema = z.object({
  review_title: z.string().min(5),
  review_body: z.string().min(10),
});

type ReviewSchema = z.infer<typeof schema>;


const ReviewForm = ({ gameId }: Props) => {
  const [rating, setRating] = useState(0);
  const postReview = usePostReview(gameId);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (review: ReviewSchema) => {
    postReview.mutate({
        rating: rating,
        review_title: review.review_title,
        review_body: review.review_body,
    });
  };

  return (
    <Box
      borderWidth={2}
      borderRadius={10}
      borderColor="teal.600"
      bgColor="gray.800"
      padding={10}
    >
      <Center>
        <Rating
          onClick={handleRating}
          SVGstyle={{ display: "inline-block" }}
          fillColor="teal"
          iconsCount={10}
          allowFraction={false}
          titleSeparator="/"
        />
      </Center>

      {postReview.error && (
        <Alert marginBottom={5} borderRadius={5} status="error">
        <AlertIcon />
        <AlertTitle>Error:</AlertTitle>
        <AlertDescription>{postReview.error.message}</AlertDescription>
      </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl marginBottom={5}>
          <FormLabel>Title</FormLabel>
          <Input
            {...register("review_title", { required: true })}
            focusBorderColor="teal.600"
            placeholder="Review title"
          />
          {errors.review_title && (
            <p className="text-danger">{errors.review_title.message}</p>
          )}
        </FormControl>

        <FormControl marginBottom={5}>
          <FormLabel>Review</FormLabel>
          <Textarea
            {...register("review_body", { required: true })}
            focusBorderColor="teal.600"
            placeholder="Review body"
          />
          {errors.review_body && (
            <p className="text-danger">{errors.review_body.message}</p>
          )}
        </FormControl>

        <Button
          isLoading={postReview.isLoading}
          colorScheme="teal"
          loadingText="Submitting"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ReviewForm;
