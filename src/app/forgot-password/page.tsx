import ForgotPassword from "@/components/common/auth/forgotPassword/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Kajlagbe",
  description: "Reset your Kajlagbe account password",
};

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}
