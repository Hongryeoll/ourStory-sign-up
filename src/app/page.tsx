"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";

export default function Home() {
  const router = useRouter();

  const handleStartSignup = () => {
    router.push("/sign-up");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          우리의 이야기에 오신 걸 환영합니다!
        </h1>
        <p className="text-gray-600">
          지금 바로 간편하게 회원가입을 시작해보세요.
        </p>

        <Button onClick={handleStartSignup} className="w-full text-lg py-3">
          회원가입 시작하기
        </Button>
      </div>
    </main>
  );
}
