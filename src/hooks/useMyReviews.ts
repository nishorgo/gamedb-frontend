import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Review from "../entities/Review";


const useMyReviews = () => {
    const apiClient = new APIClient<Review>(`/my-reviews`);
    
    return useQuery({
        queryKey: ['my-reviews'],
        queryFn: apiClient.getAll
    })
}

export default useMyReviews;