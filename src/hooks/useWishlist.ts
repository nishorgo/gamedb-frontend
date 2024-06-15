import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ms from "ms";
import Wishlist from "../entities/Wishlist";
import APIClient, { FetchResponse } from "../services/api-client";
import { useAuthStore } from "../stores/authStore";


const useWishlist = () => {
    const apiClient = new APIClient<Wishlist>(`/wishlist`);
    const username = useAuthStore(s => s.username);
    
    return useInfiniteQuery<FetchResponse<Wishlist>, Error>({
        queryKey: ['wishlist', username],
        queryFn: ({ pageParam = 1 }) =>
            apiClient.getAll({
                params : {
                    page: pageParam,
                },
            }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        },
        staleTime: ms('24h')
    })
}

export default useWishlist;