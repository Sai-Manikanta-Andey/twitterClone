import React from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const useFollow = () => {
  const queryclient = useQueryClient();
  const { mutate: follow, isPending } = useMutation({
    mutationFn: async (userId) => {
      try {
        const res = await fetch(`/api/users/follow/${userId}`, {
          method: "POST",
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.error || "Failed to follow/unfollow user");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["suggestedUsers"] });
      queryclient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
  return {
    follow,isPending}
};

export default useFollow;
