import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

export const useGetRegions = () => {
  const getRegions = async () => {
    const res = await axiosInstance.get("/region", { showToast: false });
    return res.data.regions as Region[];
  };

  return useQuery({
    queryKey: ["Regions"],
    queryFn: getRegions,
  });
};
