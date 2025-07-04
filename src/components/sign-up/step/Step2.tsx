"use client";

import { useSignupStore } from "@/hooks/useSignupStep";
import { useFormContext } from "react-hook-form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

export default function Step2() {
  const { goNext, goPrev, setStepData } = useSignupStore();

  const {
    trigger,
    getValues,
    formState: { isSubmitting },
  } = useFormContext();

  const onSubmit = async () => {
    const isStepValid = await trigger(["birthdate", "gender"]);
    if (!isStepValid) return;

    const values = getValues();
    setStepData("step2", {
      birthdate: values.birthdate,
      gender: values.gender,
    });
    goNext();
  };

  return (
    <div className="space-y-4">
      <Input name="birthdate" label="생년월일" placeholder="YYYY-MM-DD" />
      <Input name="gender" label="성별" placeholder="male / female / other" />

      <div className="flex justify-between pt-4 gap-3">
        <Button htmlType="button" onClick={goPrev} variant="line">
          이전
        </Button>
        <Button htmlType="button" onClick={onSubmit} disabled={isSubmitting}>
          다음
        </Button>
      </div>
    </div>
  );
}
