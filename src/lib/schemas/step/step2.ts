import { z } from "zod";

export const step2Schema = z.object({
  birthdate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "생년월일은 YYYY-MM-DD 형식으로 입력해주세요." }),
  gender: z.enum(["male", "female", "other"], {
    message: "성별을 선택해주세요.",
  }),
  interests: z
    .array(z.string())
    .optional()
    .refine((arr) => !arr || arr.length <= 5, {
      message: "관심사는 최대 5개까지 선택할 수 있습니다.",
    }),
});