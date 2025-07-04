import { z } from "zod";

export const step1Schema = z.object({
  username: z
    .string()
    .nonempty({ message: "아이디를 입력해주세요." })
    .min(3, { message: "아이디는 3자 이상이어야 합니다." })
    .max(20, { message: "아이디는 20자 이하로 입력해주세요." }),

  password: z
    .string()
    .nonempty({ message: "비밀번호를 입력해주세요." })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^+=])[A-Za-z\d@$!%*#?&^+=]{6,}$/,
      { message: "비밀번호는 영문, 숫자, 특수문자를 포함한 6자 이상이어야 합니다." }
    ),

  email: z
    .string()
    .nonempty({ message: "이메일을 입력해주세요." })
    .email({ message: "유효한 이메일 형식이어야 합니다." }),

  phone: z
    .string()
    .nonempty({ message: "전화번호를 입력해주세요." })
    .regex(/^010\d{8}$/, {
      message: "전화번호는 '-' 제외하고 010으로 시작하는 11자리 숫자여야 합니다.",
    }),
});