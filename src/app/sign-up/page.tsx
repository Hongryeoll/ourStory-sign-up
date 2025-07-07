import SignupForm from "@/components/sign-up/SignupForm";

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
      <p className="text-sm text-gray-600 mt-1">
        간편하게 정보를 입력하고, 우리의 이야기에 첫 장을 함께 써 내려가요.
      </p>
      <section className="mt-3">
        <SignupForm />
      </section>
    </div>
  );
}
