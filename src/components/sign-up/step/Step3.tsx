"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSignupStore } from "@/hooks/useSignupStep";
import { useFormContext } from "react-hook-form";
import { step3Schema } from "@/lib/schemas/step/step3";
import Button from "@/components/common/Button";
import SNSLinkInput from "@/components/sign-up/SNSLinkInput";
import { useState } from "react";

type FormData = z.infer<typeof step3Schema>;

export default function Step3() {
  const router = useRouter();
  const { goPrev, setStepData, resetStep } = useSignupStore();
  const [linkedState, setLinkedState] = useState({
    twitter: false,
    instagram: false,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useFormContext<FormData>();

  const onSubmit = (data: FormData) => {
    if (!linkedState.twitter) {
      data.twitter = undefined;
    }
    if (!linkedState.instagram) {
      data.instagram = undefined;
    }
    setStepData("step3", data);
    toast.success("회원가입이 성공적으로 완료되었어요! 😊");
    console.log(">> signUpData", data);
    router.replace("/");
    reset();
    resetStep();
  };

  return (
    <div className="space-y-4">
      <SNSLinkInput
        name="twitter"
        label="Twitter 계정"
        placeholder="예: ourStory123"
        baseDomain="twitter.com"
        onLinkChange={(linked) =>
          setLinkedState((prev) => ({ ...prev, twitter: linked }))
        }
      />
      <SNSLinkInput
        name="instagram"
        label="Instagram 계정"
        placeholder="예: ourStory123"
        baseDomain="instagram.com"
        onLinkChange={(linked) =>
          setLinkedState((prev) => ({ ...prev, instagram: linked }))
        }
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
