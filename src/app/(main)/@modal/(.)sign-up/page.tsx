"use client";

import { useRouter } from "next/navigation";
import SignupForm from "@/components/sign-up/SignupForm";

export default function SignupModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4">
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        {/* 닫기 버튼 */}
        <button
          onClick={() => router.back()}
          aria-label="모달 닫기"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
        >
          ✕
        </button>

        {/* 제목 및 설명 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">회원가입</h2>
          <p className="text-sm text-gray-600 mt-1">
            간편하게 정보를 입력하고, 우리의 이야기에 첫 장을 함께 써 내려가요.
          </p>
        </div>

        {/* 회원가입 폼 */}
        <SignupForm />
      </div>
    </div>
  );
}
