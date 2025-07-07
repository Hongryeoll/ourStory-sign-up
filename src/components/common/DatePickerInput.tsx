"use client";

import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { format, parse } from "date-fns";
import { useState } from "react";
import CloseSvg from "@/style/icon/x-circle.svg";
import CalendarSvg from "@/style/icon/calendar.svg";
import ChevronUpDownSVG from "@/style/icon/chevron-up-down.svg";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
}

export default function DatePickerInput({
  name,
  label,
  placeholder = "YYYY-MM-DD",
}: Props) {
  const { control, setValue } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-600">
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const selectedDate = field.value
            ? parse(field.value, "yyyy-MM-dd", new Date())
            : null;

          return (
            <div className="relative">
              <div
                className={`relative border rounded-md bg-white transition-all py-2 px-3
                ${
                  fieldState.error
                    ? "border-red-500"
                    : isFocused
                    ? "border-purple-500"
                    : "border-gray-300"
                }`}
              >
                <CalendarSvg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <DatePicker
                  id={name}
                  selected={selectedDate}
                  onChange={(date: Date | null) =>
                    field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                  }
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  dateFormat="yyyy-MM-dd"
                  locale={ko}
                  maxDate={new Date()}
                  placeholderText={placeholder}
                  wrapperClassName="w-full"
                  className="w-full pl-[32px] outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                  calendarClassName="custom-datepicker-calendar !w-full"
                  dayClassName={(date) => {
                    const isSelected =
                      field.value === format(date, "yyyy-MM-dd");

                    const isOutsideCurrentMonth =
                      date.getMonth() !==
                      (selectedDate
                        ? selectedDate.getMonth()
                        : new Date().getMonth());

                    return `
                      text-sm p-1.5 rounded-full transition-colors
                      hover:bg-purple-100 hover:text-purple-700
                      ${isSelected ? "bg-purple-500 text-white" : ""}
                      ${isOutsideCurrentMonth ? "text-gray-300" : ""}
                    `;
                  }}
                  popperClassName="custom-datepicker-popper"
                  aria-invalid={!!fieldState.error}
                  showMonthDropdown={false}
                  showYearDropdown={false}
                  renderCustomHeader={({ date, changeYear, changeMonth }) => {
                    const currentYear = date.getFullYear();
                    const currentMonth = date.getMonth();
                    const years = Array.from(
                      { length: 100 },
                      (_, i) => new Date().getFullYear() - i
                    );
                    const months = [
                      "1월",
                      "2월",
                      "3월",
                      "4월",
                      "5월",
                      "6월",
                      "7월",
                      "8월",
                      "9월",
                      "10월",
                      "11월",
                      "12월",
                    ];

                    return (
                      <div className="flex justify-between items-center mb-4 px-2 gap-2">
                        {/* Year Picker */}
                        <Listbox value={currentYear} onChange={changeYear}>
                          <div className="relative flex-1">
                            <ListboxButton className="relative w-full rounded-md border border-gray-300 bg-white py-1 px-3 text-sm pr-6">
                              {currentYear}년
                              <ChevronUpDownSVG className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                            </ListboxButton>
                            <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm ring-1 ring-black ring-opacity-5">
                              {years.map((year) => (
                                <ListboxOption key={year} value={year}>
                                  {({ selected }) => (
                                    <div
                                      className={`cursor-pointer select-none px-4 py-1 ${
                                        selected
                                          ? "bg-purple-100 text-purple-700 font-medium"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {year}년
                                    </div>
                                  )}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </div>
                        </Listbox>

                        {/* Month Picker */}
                        <Listbox value={currentMonth} onChange={changeMonth}>
                          <div className="relative flex-1">
                            <ListboxButton className="relative w-full rounded-md border border-gray-300 bg-white py-1 px-3 text-sm pr-6">
                              {months[currentMonth]}
                              <ChevronUpDownSVG className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                            </ListboxButton>
                            <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm ring-1 ring-black ring-opacity-5">
                              {months.map((month, idx) => (
                                <ListboxOption key={month} value={idx}>
                                  {({ selected }) => (
                                    <div
                                      className={`cursor-pointer select-none px-4 py-1 ${
                                        selected
                                          ? "bg-purple-100 text-purple-700 font-medium"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {month}
                                    </div>
                                  )}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </div>
                        </Listbox>
                      </div>
                    );
                  }}
                />

                {/* X 버튼 */}
                {field.value && (
                  <button
                    type="button"
                    onClick={() => setValue(name, "")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="Clear date"
                  >
                    <CloseSvg className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* 에러 메시지 */}
              {fieldState.error && (
                <p className="mt-1 text-xs text-red-500">
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
