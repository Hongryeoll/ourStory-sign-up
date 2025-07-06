"use client";

import { useSignupStore } from "@/hooks/useSignupStep";
import { useFormContext } from "react-hook-form";
import DatePickerInput from "@/components/common/DatePickerInput";
import Selectbox from "@/components/common/Selectbox";
import Button from "@/components/common/Button";

const genderOptions = [
  { label: "남성", value: "male" },
  { label: "여성", value: "female" },
];

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
      <DatePickerInput name="birthdate" label="생년월일" />
      <Selectbox
        name="gender"
        label="성별"
        options={genderOptions}
        placeholder="성별 선택"
      />
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
