import { z } from "zod";

export const step2Schema = z.object({
  birthdate: z
    .string()
    .nonempty({ message: "생년월일을 입력해주세요." })
    .refine(
      (val) => /^\d{4}-\d{2}-\d{2}$/.test(val),
      { message: "생년월일은 YYYY-MM-DD 형식으로 입력해주세요." }
    ),

  gender: z
    .string()
    .nonempty({ message: "성별을 선택해주세요." })
    .refine((val) => ["male", "female", "other"].includes(val), {
      message: "성별을 올바르게 선택해주세요.",
    }),

});