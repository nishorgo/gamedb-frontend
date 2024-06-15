import { useMutation, useQueryClient } from "@tanstack/react-query";
import Review from "../entities/Review";
import APIClient from "../services/api-client";


const usePostReview = (gameId: number) => {
  type ReviewWithoutMetadata = Omit<Review, "id" | "username" | "game_id" | "game_title" | "timestamp">;
  const apiClient = new APIClient<ReviewWithoutMetadata>(`/games/${gameId}/reviews/`)
  const queryClient = useQueryClient();
  
  return useMutation<ReviewWithoutMetadata, Error, ReviewWithoutMetadata>({
    mutationFn: apiClient.post,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
  });
}

export default usePostReview;