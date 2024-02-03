import { create } from "zustand";

interface StepperStore {
  /**
   * The active step of the stepper
   * @type {number}
   * @memberof StepperStore
   * @example
   * activeStep: 0
   * */
  activeStep: number;
  /**
   * Sets the active step of the stepper
   * @type {Function}
   * @memberof StepperStore
   * @example
   * setActiveStep(0)
   * */
  setActiveStep: (step: number) => void;
}

export const useStepperStore = create<StepperStore>((set) => ({
  activeStep: 0,
  setActiveStep: (step) => set({ activeStep: step }),
}));
