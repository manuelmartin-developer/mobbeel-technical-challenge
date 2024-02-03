import { useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
import Stepper from "./components/stepper/Stepper";
import Camera from "./components/media/Camera";
import Button from "./components/button/Button";
import { useDetectedFilesStore } from "./store/detectedFiles";
import { DocumentSide } from "./services/mobbscan.service";

interface StepsProps {
  step: number;
  title: string;
  description: string | React.ReactNode;
}

const App = () => {
  // Store states
  const { frontDocument, backDocument } = useDetectedFilesStore();
  // Constants
  const steps: StepsProps[] = [
    {
      step: 0,
      title: "Welcome​",
      description: (
        <div>
          <p>Welcome to the document scanner app</p>
          <p>In this app you will be able to scan your documents</p>
          <p>Click next to start the process</p>
        </div>
      ),
    },
    {
      step: 2,
      title: "Front document",
      description: "Please take a picture of the front of your document",
    },
    {
      step: 3,
      title: "Back document",
      description: "Please take a picture of the back of your document",
    },
    {
      step: 4,
      title: "Finish",
      description: "You have completed the process",
    },
  ];

  //   Component states
  const [activeStep, setActiveStep] = useState<number>(0);

  // Component Lifecycle
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (prefersDarkMode) {
      document.body.setAttribute("data-theme", "dark");
    }
  }, []);

  console.log(activeStep, frontDocument, backDocument);
  return (
    <Layout>
      <Stepper activeStep={activeStep} setActiveStep={setActiveStep}>
        {steps.map((step) => (
          <div key={step.step}>
            <span>{step.title}</span>
          </div>
        ))}
      </Stepper>
      <Button
        text="Next"
        onClick={() => setActiveStep(activeStep + 1)}
        disabled={activeStep === steps.length - 1}
      />
      <div>
        {steps[activeStep].description}
        {activeStep === 1 && <Camera side={DocumentSide.FRONT} />}
        {activeStep === 2 && <Camera side={DocumentSide.BACK} />}
        {activeStep === 3 && frontDocument && backDocument && (
          <>
            <img
              src={`data:image/png;base64,${frontDocument}`}
              alt="Front document"
            />
            <img
              src={`data:image/png;base64,${backDocument}`}
              alt="Back document"
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default App;
