import React from "react";

import styles from "./Stepper.module.scss";

import { useStepperStore } from "../../store/stepper.store";

interface StepperProps {
  /**
   * The children to render inside the stepper
   * @type {React.ReactNode}
   * @memberof StepperProps
   * @required
   * @example
   * <Stepper>
   * <Step title="Welcome" description="Welcome to the document scanner app" />
   * <Step title="Front document" description="Please take a picture of the front of your document" />
   * </Stepper>
   * */
  children: React.ReactNode;
}

const Stepper: React.FC<StepperProps> = ({ children }) => {
  // Store states
  const { activeStep } = useStepperStore();
  return (
    <section className={styles.stepper}>
      <div className={styles.stepper__line}></div>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child as React.ReactElement, {
          className: `${styles.stepper__step} ${
            index === activeStep ? styles.stepper__step_active : ""
          } ${index < activeStep ? styles.stepper__step_done : ""} ${
            index > activeStep ? styles.stepper__step_disabled : ""
          }`,
        });
      })}
    </section>
  );
};

export default Stepper;
