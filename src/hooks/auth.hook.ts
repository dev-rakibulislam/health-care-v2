import { getMe, googleLogin, userLogin, userLogOut } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useLogOut() {
  return useMutation({
    mutationFn: userLogOut,
  });
}

export function useGoogleOLogin() {
  return useMutation({
    mutationFn: googleLogin,
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}
