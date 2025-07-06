"use client";

import { useState } from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { toast } from "react-hot-toast";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

interface SNSLinkInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  validator?: (url: string) => boolean;
}

export default function SNSLinkInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  validator = (url) => url.startsWith("https://"),
}: SNSLinkInputProps<T>) {
  const { watch } = useFormContext<T>();
  const value = watch(name);

  const [linked, setLinked] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-600">
        {label}
      </label>

      <div className="flex items-start gap-2 w-full">
        <div className="w-3/4">
          <Input<T>
            name={name}
            label=""
            placeholder={placeholder}
            type="text"
            className="pr-10 w-full"
            disabled={linked}
          />
        </div>

        {/* Button: 1/4 */}
        <div className="w-1/4 flex justify-end py-1">
          {!linked ? (
            <Button
              htmlType="button"
              onClick={() => {
                if (validator(value)) {
                  setLinked(true);
                } else {
                  toast.error("유효한 URL을 입력해주세요.");
                }
              }}
              className="w-full min-w-[60px] h-[38px]"
            >
              연동
            </Button>
          ) : (
            <Button
              htmlType="button"
              variant="line"
              onClick={() => {
                setLinked(false);
              }}
              className="w-full min-w-[60px] h-[38px]"
            >
              수정
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
