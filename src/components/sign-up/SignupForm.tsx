"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupStore } from "@/hooks/useSignupStep";
import { fullSignupSchema } from "@/lib/schemas";
import Step1 from "@/components/sign-up/step/Step1";
import Step2 from "@/components/sign-up/step/Step2";
import Step3 from "@/components/sign-up/step/Step3";
import { z } from "zod";

type SignupFormSchema = z.infer<typeof fullSignupSchema>;

export default function SignupForm() {
  const { step } = useSignupStore();

  const methods = useForm<SignupFormSchema>({
    resolver: zodResolver(fullSignupSchema),
    mode: "onChange",
    defaultValues: {
      // Step1
      username: "",
      password: "",
      email: "",
      phone: "",
      // Step2
      birthdate: "",
      gender: "",
      // Step3
      twitter: "",
      instagram: "",
    },
  });

  const onSubmit = (data: SignupFormSchema) => {
    console.log("🎉 전체 제출", data);
    // 이후 API 요청 등 처리
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
