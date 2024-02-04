import { useEffect } from "react";

import { useThemeStore } from "./store/theme.store";
import { DocumentSide } from "./services/mobbscan.service";
import { useDetectedFilesStore } from "./store/detectedFiles.store";

import styles from "./App.module.scss";

import Layout from "./components/layout/Layout";
import Stepper from "./components/stepper/Stepper";
import Camera from "./components/camera/Camera";
import Button from "./components/button/Button";
import { useStepperStore } from "./store/stepper.store";
import { TbRefresh } from "react-icons/tb";

interface StepsProps {
  /**
   * The step number
   * @type {number}
   * @memberof StepsProps
   * @required
   * @example
   * step: 0
   * */
  step: number;
  /**
   * The title of the step
   * @type {string}
   * @memberof StepsProps
   * @required
   * @example
   * title: "Welcome"
   * */
  title: string;
  /**
   * The description of the step
   * @type {string | React.ReactNode}
   * @memberof StepsProps
   * @required
   * @example
   * description: "Please take a picture of the front of your document"
   * */
  description: string | React.ReactNode;
}

const App = () => {
  // Store states
  const { frontDocument, backDocument } = useDetectedFilesStore();

  // Constants
  const steps: StepsProps[] = [
    {
      step: 1,
      title: "Welcome​",
      description: (
        <>
          <h4>Welcome to the document scanner app</h4>
          <p>In this app you will be able to scan your documents</p>
          <p>Click next to start the process</p>
        </>
      ),
    },
    {
      step: 2,
      title: "Front document",
      description: (
        <p>
          Please, select the capture mode for detecting the front of your
          document
        </p>
      ),
    },
    {
      step: 3,
      title: "Back document",
      description: (
        <p>
          Please, select the capture mode for detecting the back of your
          document
        </p>
      ),
    },
    {
      step: 4,
      title: "Finish",
      description: (
        <>
          <h4>You have completed the process</h4>
          <p>Your document has been scanned successfully</p>
          <p>
            Check the images below and if something is wrong, you can go click
            on retake button to start the process again
          </p>
        </>
      ),
    },
  ];

  // Store states
  const { theme, setTheme } = useThemeStore();
  const { activeStep, setActiveStep } = useStepperStore();
  const { setFrontDocument, setBackDocument } = useDetectedFilesStore();

  // Methods
  const resetProcess = () => {
    setActiveStep(0);
    setFrontDocument(null);
    setBackDocument(null);
  };

  // Component Lifecycle
  useEffect(() => {
    const theme = window.localStorage.getItem("theme");
    if (!theme) {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (prefersDarkMode) {
        setTheme("dark");
      }
      return;
    }
    setTheme(theme as "light" | "dark");
  }, [setTheme]);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Layout>
      <Stepper>
        {steps.map((step) => (
          <article key={step.step} data-testid={`step-${step.step}`}>
            <div>{step.title}</div>
          </article>
        ))}
      </Stepper>
      <section className={styles.content}>
        {steps[activeStep].description}
        {activeStep === 1 && <Camera side={DocumentSide.FRONT} />}
        {activeStep === 2 && <Camera side={DocumentSide.BACK} />}
        {activeStep === 3 && frontDocument && backDocument && (
          <article className={styles.documents}>
            <h4>Document detected</h4>
            <img
              src={`data:image/png;base64,${frontDocument}`}
              alt="Front document"
            />
            <img
              src={`data:image/png;base64,${backDocument}`}
              alt="Back document"
            />
            <Button text={<TbRefresh />} onClick={resetProcess} iconButton />
          </article>
        )}
      </section>
      {activeStep < 3 && (
        <section className={styles.actions}>
          <Button
            text="Next"
            onClick={() => setActiveStep(activeStep + 1)}
            disabled={
              (activeStep === 1 && !frontDocument) ||
              (activeStep === 2 && !backDocument)
            }
            width="300px"
            height="40px"
          />
        </section>
      )}
    </Layout>
  );
};

export default App;
