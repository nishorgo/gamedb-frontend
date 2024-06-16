import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";


const useDeleteReview = (gameId:number) => {
    const apiClient = new APIClient(`/games/${gameId}/reviews/`);
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: (reviewId: number) => apiClient.delete(reviewId),
  
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["reviews"],
        });
      },
    });
}

export default useDeleteReview;