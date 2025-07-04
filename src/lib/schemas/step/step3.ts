import { z } from "zod";

export const step3Schema = z.object({
  twitter: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+$/.test(val),
      { message: "유효한 트위터 주소를 입력해주세요." }
    ),

  instagram: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+$/.test(val),
      { message: "유효한 인스타그램 주소를 입력해주세요." }
    ),
});