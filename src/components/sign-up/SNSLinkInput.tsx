"use client";

import { useState } from "react";
import {
  useFormContext,
  FieldValues,
  Path,
  useController,
  PathValue,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { step3Schema } from "@/lib/schemas/step/step3";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

interface SNSLinkInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  baseDomain: string;
}

export default function SNSLinkInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  baseDomain,
}: SNSLinkInputProps<T>) {
  const { watch, setValue, control } = useFormContext<T>();
  const { field } = useController({ name, control });
  const [linked, setLinked] = useState(false);
  const rawValue = watch(name);
  const username = rawValue?.replace(`https://${baseDomain}/`, "") ?? "";

  const formatUrl = (username: string) => {
    const clean = username.trim().replace(/^@/, "");
    return `https://${baseDomain}/${clean}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = formatUrl(e.target.value);
    field.onChange(newUrl as PathValue<T, Path<T>>);
  };

  const handleLink = () => {
    const fullUrl = formatUrl(username);
    const fieldSchema = step3Schema.shape[name as "twitter" | "instagram"];

    const result = fieldSchema.safeParse(fullUrl);

    if (result.success) {
      setValue(name, fullUrl as PathValue<T, Path<T>>);
      toast.success(`${label}이 성공적으로 연동되었습니다.`);
      setLinked(true);
    } else {
      toast.error(
        result.error.errors[0]?.message || "유효하지 않은 계정입니다."
      );
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-600">
        {label}
      </label>
      <div className="flex items-start gap-2 w-full">
        <div className="w-3/4">
          <Input
            name={name}
            label=""
            placeholder={placeholder}
            type="text"
            className="pr-10 w-full"
            value={username}
            onChange={handleChange}
            disabled={linked}
          />
        </div>
        <div className="w-1/4 flex justify-end py-1">
          {!linked ? (
            <Button
              htmlType="button"
              onClick={handleLink}
              className="w-full min-w-[60px] h-[38px]"
            >
              연동
            </Button>
          ) : (
            <Button
              htmlType="button"
              variant="line"
              onClick={() => setLinked(false)}
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
