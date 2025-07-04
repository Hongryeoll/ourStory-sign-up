"use client";

import { z } from "zod";
import { useSignupStore } from "@/hooks/useSignupStep";
import { useFormContext } from "react-hook-form";
import { step3Schema } from "@/lib/schemas/step/step3";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

type FormData = z.infer<typeof step3Schema>;

export default function Step3() {
  const { goPrev, setStepData } = useSignupStore();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FormData>();

  const onSubmit = (data: FormData) => {
    setStepData("step3", data);
    alert("✅ 회원가입 데이터가 저장되었습니다.");
    console.log(">>signUpData", data);
  };

  return (
    <div className="space-y-4">
      <Input
        name="twitter"
        label="Twitter 계정 URL"
        placeholder="https://twitter.com/yourname"
      />
      <Input
        name="instagram"
        label="Instagram 계정 URL"
        placeholder="https://instagram.com/yourname"
      />

      <div className="flex justify-between pt-4 gap-3">
        <Button type="button" onClick={goPrev}>
          이전
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          제출
        </Button>
      </div>
    </div>
  );
}
