import { z } from "zod";

export const step3Schema = z.object({
  twitter: z
    .string()
    .url({ message: "유효한 트위터 주소를 입력해주세요." })
    .optional()
    .or(z.literal("")),
  instagram: z
    .string()
    .url({ message: "유효한 인스타그램 주소를 입력해주세요." })
    .optional()
    .or(z.literal("")),
});