import { LoginForm, LoginHeader } from "@/components/features/login";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-[448px]">
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  );
}
