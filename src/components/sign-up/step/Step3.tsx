"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSignupStore } from "@/hooks/useSignupStep";
import { useFormContext } from "react-hook-form";
import { step3Schema } from "@/lib/schemas/step/step3";
import Button from "@/components/common/Button";
import SNSLinkInput from "@/components/sign-up/SNSLinkInput";

type FormData = z.infer<typeof step3Schema>;

export default function Step3() {
  const router = useRouter();
  const { goPrev, setStepData, resetStep } = useSignupStore();
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useFormContext<FormData>();

  const onSubmit = (data: FormData) => {
    setStepData("step3", data);
    toast.success("회원가입 데이터가 저장되었습니다.");
    console.log(">>signUpData", data);

    reset();
    resetStep();
    router.push("/");
  };

  return (
    <div className="space-y-4">
      <SNSLinkInput<FormData>
        name="twitter"
        label="Twitter 계정 URL"
        placeholder="https://twitter.com/yourname"
        validator={(url) => url.startsWith("https://twitter.com/")}
      />

      <SNSLinkInput<FormData>
        name="instagram"
        label="Instagram 계정 URL"
        placeholder="https://instagram.com/yourname"
        validator={(url) => url.startsWith("https://instagram.com/")}
      />

      <div className="flex justify-between pt-4 gap-3">
        <Button htmlType="button" onClick={goPrev} variant="line">
          이전
        </Button>
        <Button
          htmlType="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          제출
        </Button>
      </div>
    </div>
  );
}
