"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupStore } from "@/hooks/useSignupStep";
import { fullSignupSchema } from "@/lib/schemas";
import { SignupFormData } from "@/types/signup";

import Step1 from "@/components/sign-up/step/Step1";
import Step2 from "@/components/sign-up/step/Step2";
import Step3 from "@/components/sign-up/step/Step3";

export default function SignupForm() {
  const { step } = useSignupStore();

  const methods = useForm<SignupFormData>({
    resolver: zodResolver(fullSignupSchema),
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("🎉 전체 제출", data);

    // API 연결 필요
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </form>
    </FormProvider>
  );
}
