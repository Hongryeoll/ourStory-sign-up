import { step1Schema } from './step/step1';
import { step2Schema } from './step/step2';
import { step3Schema } from './step/step3';

export const fullSignupSchema = step1Schema.merge(step2Schema).merge(step3Schema);