import { z, ZodType } from "zod";

const twitterRegex = /^https:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]{1,15}$/;
const instagramRegex =
  /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]{1,30}$/;

export const step3Schema = z.object({
  twitter: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .optional()
      .refine((val) => !val || twitterRegex.test(val), {
        message: "유효한 Twitter 계정 주소를 입력해주세요.",
      })
  ) as ZodType<string | undefined>,

  instagram: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .optional()
      .refine((val) => !val || instagramRegex.test(val), {
        message: "유효한 Instagram 계정 주소를 입력해주세요.",
      })
  ) as ZodType<string | undefined>,
});
