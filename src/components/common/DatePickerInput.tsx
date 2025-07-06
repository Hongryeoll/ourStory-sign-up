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
                className={`relative flex items-center px-3 py-2 border rounded-md transition-all shadow-sm bg-white
                ${
                  fieldState.error
                    ? "border-red-500 shadow-[0_0_0_2px_rgba(239,68,68,0.3)]"
                    : isFocused
                    ? "border-purple-500 shadow-[0_0_0_2px_rgba(168,85,247,0.3)]"
                    : "border-gray-300"
                }`}
              >
                <CalendarSvg className="w-5 h-5 text-gray-400 mr-2" />

                <DatePicker
                  id={name}
                  selected={selectedDate}
                  onChange={(date: Date | null) => {
                    if (date) {
                      field.onChange(format(date, "yyyy-MM-dd"));
                    } else {
                      field.onChange("");
                    }
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  dateFormat="yyyy-MM-dd"
                  locale={ko}
                  maxDate={new Date()}
                  placeholderText={placeholder}
                  className="w-full pr-7 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                  calendarClassName="custom-datepicker-calendar"
                  dayClassName={(date) =>
                    `text-sm p-1.5 rounded-full transition-colors
                    hover:bg-purple-100 hover:text-purple-700
                    ${
                      field.value === format(date, "yyyy-MM-dd")
                        ? "bg-purple-500 text-white"
                        : ""
                    }`
                  }
                  popperClassName="z-50"
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
                        {/* Year */}
                        <Listbox value={currentYear} onChange={changeYear}>
                          <div className="relative w-28">
                            <ListboxButton className="relative w-full rounded-md border border-gray-300 bg-white py-1 px-2 text-sm text-left shadow-sm">
                              {currentYear}년
                              <ChevronUpDownSVG className="w-4 h-4 absolute right-2 top-2.5 text-gray-400" />
                            </ListboxButton>
                            <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
                              {years.map((year) => (
                                <ListboxOption
                                  key={year}
                                  value={year}
                                  className={({ active }) =>
                                    `cursor-pointer select-none px-4 py-1 ${
                                      active
                                        ? "bg-purple-100 text-purple-700"
                                        : "text-gray-900"
                                    }`
                                  }
                                >
                                  {year}년
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </div>
                        </Listbox>

                        {/* Month */}
                        <Listbox value={currentMonth} onChange={changeMonth}>
                          <div className="relative w-28">
                            <ListboxButton className="relative w-full rounded-md border border-gray-300 bg-white py-1 px-2 text-sm text-left shadow-sm">
                              {months[currentMonth]}
                              <ChevronUpDownSVG className="w-4 h-4 absolute right-2 top-2.5 text-gray-400" />
                            </ListboxButton>
                            <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
                              {months.map((month, idx) => (
                                <ListboxOption
                                  key={month}
                                  value={idx}
                                  className={({ active }) =>
                                    `cursor-pointer select-none px-4 py-1 ${
                                      active
                                        ? "bg-purple-100 text-purple-700"
                                        : "text-gray-900"
                                    }`
                                  }
                                >
                                  {month}
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
                    className="absolute right-3"
                    aria-label="Clear date"
                  >
                    <CloseSvg className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

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
