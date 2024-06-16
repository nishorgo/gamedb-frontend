import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

export interface IsInWishlist {
    "is_in_wishlist": boolean;
    "wishlist_id": number;
}

const apiClient = new APIClient<IsInWishlist>(`/wishlist/is_in_wishlist/`);

const useIsInWishlist = (slug: string) => useQuery({
    queryKey: ['is_in_wishlist', slug],
    queryFn: () => apiClient.get(slug)
});

export default useIsInWishlist;