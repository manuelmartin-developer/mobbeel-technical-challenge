import React from "react";
import styles from "./Stepper.module.scss";

interface StepperProps {
  children: React.ReactNode;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const Stepper: React.FC<StepperProps> = ({
  children,
  activeStep,
  setActiveStep,
}) => {
  return (
    <div className={styles.stepper}>
      <div className={styles.stepper__line}></div>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child as React.ReactElement, {
          onClick: () => setActiveStep(index),
          className: `${styles.stepper__step} ${
            index === activeStep ? styles.stepper__step_active : ""
          } ${index < activeStep ? styles.stepper__step_done : ""} ${
            index > activeStep ? styles.stepper__step_disabled : ""
          }`,
        });
      })}
    </div>
  );
};

export default Stepper;
