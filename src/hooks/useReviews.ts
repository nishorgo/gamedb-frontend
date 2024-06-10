import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Review from "../entities/Review";


const useReviews = (gameId: number) => {
    const apiClient = new APIClient<Review>(`/games/${gameId}/reviews`);
    
    return useQuery({
        queryKey: ['reviews', gameId],
        queryFn: apiClient.getAll
    })
}

export default useReviews;