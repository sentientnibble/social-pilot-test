import React, { useState } from "react";
import InitialStep, { formValues } from "./InitialStep";
import { ToastContainer } from "react-toastify";
import DetailStep from "./DetailStep";
import StyledDropzone from "./FinalStep";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [step, setStep] = useState(0);
  const [initialValues, setInitialValues] = useState<formValues>({
    address: "",
    bedroom: "",
    bathroom: "",
    description: "",
  });
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <ToastContainer />
      {step === 0 && (
        <InitialStep setStep={setStep} setInitialValues={setInitialValues} />
      )}
      {step === 1 && (
        <DetailStep
          setStep={setStep}
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {step === 2 && (
        <StyledDropzone setStep={setStep} initialValues={initialValues} />
      )}
    </div>
  );
}

export default App;
