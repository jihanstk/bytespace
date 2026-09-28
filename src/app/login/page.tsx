import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";
import AuthLayout from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to ByteSpace to continue learning.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in with ease"
      description="Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."
      eyebrow="Sign In"
      heading="Welcome Back"
    >
      <AuthForm
        fields={[
          { name: "email", label: "Email", type: "email", placeholder: "designer@example.com", autoComplete: "email" },
          { name: "password", label: "Password", type: "password", placeholder: "********", autoComplete: "current-password" },
        ]}
        submitLabel="Sign In"
        socialSignIn
        footer={{ prompt: "New user?", linkLabel: "Create an account", href: "/register" }}
      />
    </AuthLayout>
  );
}
