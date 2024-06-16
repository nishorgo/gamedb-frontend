import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";


const useDeleteFromWishlist = () => {
    const apiClient = new APIClient(`/wishlist/`);
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: (wishlistId: number) => apiClient.delete(wishlistId),
  
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["wishlist"],
        });
      },
    });
}

export default useDeleteFromWishlist;