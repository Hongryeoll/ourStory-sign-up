"use client";

import { useState, ChangeEvent } from "react";
import { useFormContext, FieldValues, Path, FieldError } from "react-hook-form";
import CloseSvg from "@/style/icon/x-circle.svg";
import ViewSvg from "@/style/icon/view.svg";
import ViewHideSvg from "@/style/icon/view-slash.svg";

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: "text" | "password" | "email" | "tel";
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input<T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder = "",
  disabled = false,
  className = "",
  value,
  onChange,
}: InputProps<T>) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<T>();

  const watchedValue = watch(name); // uncontrolled용
  const isControlled = value !== undefined && onChange !== undefined;
  const [showPwd, setShowPwd] = useState(false);
  const inputType = type === "password" && showPwd ? "text" : type;

  const errorMessage = (errors?.[name as string] as FieldError | undefined)
    ?.message;

  const handleClear = () => {
    setValue(name, "" as T[typeof name]);
    if (isControlled && onChange) {
      onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-600">
        {label}
      </label>

      <div className="relative">
        <div
          className={`flex items-center px-3 py-2 border rounded-md transition-all
          ${
            errorMessage
              ? "border-red-500"
              : "border-gray-300 focus-within:border-purple-500"
          }
          ${disabled ? "bg-gray-100" : "bg-white"}
        `}
        >
          <input
            id={name}
            type={inputType}
            placeholder={placeholder}
            maxLength={type === "tel" ? 11 : undefined}
            inputMode={type === "tel" ? "numeric" : undefined}
            pattern={type === "tel" ? "\\d*" : undefined}
            onInput={(e) => {
              if (type === "tel") {
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/\D/g, "");
              }
            }}
            className={`flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 ${className}`}
            disabled={disabled}
            {...(isControlled ? { value, onChange } : { ...register(name) })}
          />

          {/* 비밀번호 보기 토글 */}
          {type === "password" && (isControlled ? value : watchedValue) && (
            <button
              type="button"
              onClick={() => setShowPwd((prev) => !prev)}
              className="ml-2"
            >
              {showPwd ? (
                <ViewSvg className="w-5 h-5 text-gray-400" />
              ) : (
                <ViewHideSvg className="w-5 h-5 text-gray-400" />
              )}
            </button>
          )}

          {/* X 버튼 */}
          {(isControlled ? value : watchedValue) && !disabled && (
            <button type="button" onClick={handleClear} className="ml-1">
              <CloseSvg className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* 에러 메시지 */}
        {errorMessage && (
          <p className="absolute left-0 mt-1 text-xs text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
