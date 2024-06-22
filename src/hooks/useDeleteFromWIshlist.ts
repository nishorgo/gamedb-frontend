import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";


const useDeleteFromWishlist = (onSuccessCallback: () => void) => {
    const apiClient = new APIClient(`/wishlist/`);
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: (wishlistId: number) => apiClient.delete(wishlistId),
  
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["wishlist"],
        });
        onSuccessCallback();
      },
    });
}

export default useDeleteFromWishlist;