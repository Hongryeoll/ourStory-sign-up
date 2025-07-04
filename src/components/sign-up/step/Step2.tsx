"use client";

import { z } from "zod";
import { useSignupStore } from "@/hooks/useSignupStep";
import { useFormContext } from "react-hook-form";
import { step2Schema } from "@/lib/schemas/step/step2";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

type FormData = z.infer<typeof step2Schema>;

export default function Step2() {
  const { goNext, goPrev, setStepData } = useSignupStore();
  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useFormContext<FormData>();

  const onSubmit = (data: FormData) => {
    setStepData("step2", data);
    goNext();
  };

  return (
    <div className="space-y-4">
      <Input name="birthdate" label="생년월일" placeholder="YYYY-MM-DD" />
      <Input name="gender" label="성별" placeholder="male / female / other" />

      <div className="flex justify-between pt-4 gap-3">
        <Button type="button" onClick={goPrev}>
          이전
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || isSubmitting}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
