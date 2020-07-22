import React from "react";

interface IProps {
  error: string;
}
/**
 * common field error message component
 * @param props
 */
const FieldErrorMessage: React.FC<IProps> = ({ error }) => {
  return (
    <p className="mt-2 text-sm text-red-600" id="email-error">
      {error}
    </p>
  );
};

export default FieldErrorMessage;
