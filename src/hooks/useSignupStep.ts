import { create } from "zustand";
import { Step1Data, Step2Data, Step3Data } from "@/types/signup";

type SignupStep = 1 | 2 | 3;

type StepData = {
  step1?: Step1Data;
  step2?: Step2Data;
  step3?: Step3Data;
};

interface SignupStore {
  step: SignupStep;
  stepData: StepData;
  goNext: () => void;
  goPrev: () => void;
  setStepData: <K extends keyof StepData>(key: K, data: StepData[K]) => void;
  reset: () => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  step: 1,
  stepData: {},
  goNext: () =>
    set((state) => ({
      step: Math.min(state.step + 1, 3) as SignupStep,
    })),
  goPrev: () =>
    set((state) => ({
      step: Math.max(state.step - 1, 1) as SignupStep,
    })),
  setStepData: (key, data) =>
    set((state) => ({
      stepData: {
        ...state.stepData,
        [key]: data,
      },
    })),
  reset: () =>
    set(() => ({
      step: 1,
      stepData: {},
    })),
}));