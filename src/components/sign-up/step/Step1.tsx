"use client";

import { useFormContext } from "react-hook-form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useSignupStore } from "@/hooks/useSignupStep";

export default function Step1() {
  const {
    trigger,
    getValues,
    formState: { isSubmitting },
  } = useFormContext();

  const { goNext, setStepData } = useSignupStore();

  const onSubmit = async () => {
    const isStepValid = await trigger([
      "username",
      "password",
      "email",
      "phone",
    ]);
    if (!isStepValid) return;

    const values = getValues();
    setStepData("step1", {
      username: values.username,
      password: values.password,
      email: values.email,
      phone: values.phone,
    });
    goNext();
  };

  return (
    <>
      <div className="space-y-4">
        <Input name="username" label="아이디" />
        <Input name="password" label="비밀번호" type="password" />
        <Input name="email" label="이메일" type="email" />
        <Input name="phone" label="전화번호" type="tel" />
      </div>

      <div className="pt-6 flex justify-end">
        <Button htmlType="button" onClick={onSubmit} disabled={isSubmitting}>
          다음
        </Button>
      </div>
    </>
  );
}
