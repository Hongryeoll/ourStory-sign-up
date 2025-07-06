"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useFormContext, Controller } from "react-hook-form";
import ChevronUpDownSVG from "@/style/icon/chevron-up-down.svg";
import CheckSvg from "@/style/icon/check.svg";

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label?: string;
  options: Option[];
  placeholder?: string;
}

export default function Selectbox({
  name,
  label,
  options,
  placeholder = "선택하세요",
}: Props) {
  const { control } = useFormContext();

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-600">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const selectedOption = options.find(
            (opt) => opt.value === field.value
          );

          return (
            <div className="relative">
              <Listbox value={field.value} onChange={field.onChange}>
                <div className="relative">
                  <ListboxButton
                    className={`relative w-full cursor-pointer rounded-md border px-3 py-2 text-left text-sm shadow-sm bg-white
                    ${
                      fieldState.error
                        ? "border-red-500 shadow-[0_0_0_2px_rgba(239,68,68,0.3)]"
                        : "border-gray-300"
                    }`}
                  >
                    <span className="block truncate text-gray-800">
                      {selectedOption?.label || placeholder}
                    </span>
                    <ChevronUpDownSVG className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                  </ListboxButton>

                  <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
                    <ListboxOption
                      value=""
                      className="cursor-pointer select-none px-4 py-2 text-gray-500 hover:bg-purple-100 hover:text-purple-700"
                    >
                      {placeholder}
                    </ListboxOption>

                    {options.map((option) => (
                      <ListboxOption key={option.value} value={option.value}>
                        {({ selected, active }) => (
                          <div
                            className={`flex justify-between items-center px-4 py-2 cursor-pointer select-none
                              ${
                                active
                                  ? "bg-purple-100 text-purple-700"
                                  : "text-gray-900"
                              }`}
                          >
                            <span
                              className={`truncate text-sm ${
                                selected ? "font-semibold" : ""
                              }`}
                            >
                              {option.label}
                            </span>
                            {selected && (
                              <CheckSvg className="w-4 h-4 text-purple-600" />
                            )}
                          </div>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>

              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
