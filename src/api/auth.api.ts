import apiClient from "@/lib/apiClient";

export function userLogin(payload: { email: string; password: string }) {
  return apiClient("/api/v1/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function userLogOut() {
  return apiClient("/api/v1/auth/logout", {
    method: "POST",
  });
}

export function getMe() {
  return apiClient("/api/v1/auth/me");
}

export function googleLogin(payload: { idToken: string }) {
  return apiClient("/api/v1/auth/google", { method: "POST", body: payload });
}
