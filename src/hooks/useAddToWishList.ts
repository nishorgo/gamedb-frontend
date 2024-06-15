import { useMutation, useQueryClient } from "@tanstack/react-query";
import Wishlist from "../entities/Wishlist";
import APIClient from "../services/api-client";


const useAddtoWishList = (onSuccessCallback: () => void) => {
  type WishlistWithoutMetadata = {game: number};
  const apiClient = new APIClient<WishlistWithoutMetadata>(`/wishlist/`)
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiClient.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
      onSuccessCallback();
    },
  });
}

export default useAddtoWishList;