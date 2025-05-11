import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export const useSyncCart = () => {
  return useMutation({
    mutationFn: (data: CartItem[]) =>
      axiosInstance.post(
        "/cart/sync",
        { cartItems: data },
        { showToast: false }
      ),
  });
};

export const useGetCartItems = () => {
  const getCartItems = async () => {
    const res = await axiosInstance.get("/cart", { showToast: false });
    return res.data.cart as CartItem[];
  };

  return useQuery({
    queryKey: ["Cart"],
    queryFn: getCartItems,
    enabled: false,
    retry: false,
  });
};

export const useAddItemToCart = () => {
  return useMutation({
    mutationFn: (data: CartItem) => {
      return axiosInstance.post("/cart/add", data);
    },
  });
};

export const useRemoveItemFromCart = () => {
  return useMutation({
    mutationFn: (slug: string) => {
      return axiosInstance.delete(`/cart/remove/${slug}`);
    },
  });
};
