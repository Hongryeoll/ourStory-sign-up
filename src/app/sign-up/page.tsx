import SignupForm from "@/components/sign-up/SignupForm";

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">회원가입</h1>
      <SignupForm />
    </div>
  );
}
