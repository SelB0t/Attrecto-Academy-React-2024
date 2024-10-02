import classNames from "classnames";
import { ReactNode } from "react";

import classes from "./BaseField.module.scss";

interface BaseFieldProps {
  label: string;
  className?: string;
  children: ReactNode;
  error?: string;
}

const BaseField = ({ label, className, children, error }: BaseFieldProps) => {
  return (
    <div className={classNames("form-group", className)}>
      <label className="mb-2">{label}</label>
      {children}
      <div className={classNames("mt-2", classes.ErrorMessage)}>{error}</div>
    </div>
  );
};

export default BaseField;
