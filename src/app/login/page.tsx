import Login from "@/components/common/auth/login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Kajlagbe",
  description: "Sign in to your Kajlagbe account",
};

export default function LoginPage() {
  return <Login />;
}
