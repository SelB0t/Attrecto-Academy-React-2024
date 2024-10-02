import React from "react";
import { UseFormRegister } from "react-hook-form";
import BaseField from "../base-field/BaseField";

interface TextFieldProps {
  label: string;
  type?: string;
  className?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
}

const TextField = ({
  name,
  label,
  className,
  register,
  error,
  type = "text",
}: TextFieldProps) => {
  return (
    <BaseField className={className} label={label} error={error}>
      <input type={type} className="form-control" {...register(name)} />
    </BaseField>
  );
};

export default TextField;
