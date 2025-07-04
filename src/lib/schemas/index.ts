import { step1Schema } from '@/lib/schemas/step/step1';
import { step2Schema } from '@/lib/schemas/step/step2';
import { step3Schema } from '@/lib/schemas/step/step3';


export const fullSignupSchema = step1Schema.merge(step2Schema).merge(step3Schema);