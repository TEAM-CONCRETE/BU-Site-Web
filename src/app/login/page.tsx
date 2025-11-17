import { LoginForm, LoginHeader } from "@/components/features/login";
import { LoginRedirect } from "@/components/auth/LoginRedirect";

export default function LoginPage() {
  return (
    <>
      <LoginRedirect />
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-[448px]">
          <LoginHeader />
          <LoginForm />
        </div>
      </div>
    </>
  );
}
