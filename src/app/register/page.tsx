import Register from "@/components/common/auth/register/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Kajlagbe",
  description: "Create a new account on Kajlagbe",
};

export default function RegisterPage() {
  return <Register />;
}
