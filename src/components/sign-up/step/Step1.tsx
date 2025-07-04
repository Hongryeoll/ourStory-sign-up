import { useFormContext } from "react-hook-form";
import { SignupFormData } from "@/types/signup";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useSignupStore } from "@/hooks/useSignupStep";

export default function Step1() {
  const { trigger } = useFormContext<SignupFormData>();
  const { goNext } = useSignupStore();

  const onNext = async () => {
    const valid = await trigger(["username", "password", "email", "phone"]);
    if (valid) goNext();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <Input name="username" label="아이디" />
        <Input name="password" label="비밀번호" type="password" />
        <Input name="email" label="이메일" type="email" />
        <Input name="phone" label="전화번호" type="tel" />
      </div>

      <Button onClick={onNext} className="self-end">
        다음
      </Button>
    </div>
  );
}
