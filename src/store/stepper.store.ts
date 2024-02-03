import { create } from "zustand";

interface StepperStore {
  activeStep: number;
  setActiveStep: (step: number) => void;
  completedSteps: number[];
  setCompletedSteps: (steps: number[]) => void;
}

export const useStepperStore = create<StepperStore>((set) => ({
  activeStep: 0,
  setActiveStep: (step) => set({ activeStep: step }),
  completedSteps: [],
  setCompletedSteps: (steps) => set({ completedSteps: steps }),
}));
