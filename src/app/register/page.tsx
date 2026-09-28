import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";
import AuthLayout from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Create an Account",
  description: "Join ByteSpace to learn from and create courses with a global community.",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Sign up and come in"
      description="The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost"
      eyebrow="Create an Account"
      heading={
        <>
          Welcome to
          <br /> ByteSpace
        </>
      }
    >
      <AuthForm
        fields={[
          { name: "name", label: "Full Name", type: "text", placeholder: "Jamie Davis", autoComplete: "name" },
          { name: "email", label: "Email", type: "email", placeholder: "designer@example.com", autoComplete: "email" },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "********",
            autoComplete: "new-password",
            minLength: 8,
          },
        ]}
        submitLabel="Continue"
        footer={{ prompt: "Already have an account?", linkLabel: "Login", href: "/login" }}
      />
    </AuthLayout>
  );
}
