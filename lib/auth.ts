import { LoginResponse } from "@/types";

export async function loginUser(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.trim(),
      password: password,
      expiresInMins: 60,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      data?.message === "Invalid credentials"
        ? "Username atau password salah. Silakan periksa kembali."
        : data?.message ||
          "Terjadi kesalahan saat menghubungi server autentikasi.";

    throw new Error(errorMessage);
  }

  return data as LoginResponse;
}
