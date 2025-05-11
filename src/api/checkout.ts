import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

interface CreateOrderProp {
  deliveryAddress: string;
  deliveryRegionId: string;
  cartId?: string;
}

export const useGetOrder = (orderNumber: string) => {
  const getOrder = async () => {
    const res = await axiosInstance.get(`/checkout/${orderNumber}`, {
      showToast: false,
    });
    return res.data.order;
  };

  return useQuery({
    queryKey: ["Order"],
    queryFn: getOrder,
    enabled: !!orderNumber,
    retry: 2,
  });
};

export const useUpdateOrderItem = () => {
  return useMutation({
    mutationFn: (data: {
      itemId: string;
      type: "increment" | "decrement" | "delete";
    }) => {
      return axiosInstance.patch("/checkout", data);
    },
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (data: CreateOrderProp) => {
      return axiosInstance.post("/checkout", data);
    },
  });
};
