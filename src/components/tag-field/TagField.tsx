import { ReactNode } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import BaseField from "../base-field/BaseField";
import classNames from "classnames";

import classes from "./TagField.module.scss";

interface TagFieldProps<T> {
  name: string;
  label: string;
  options: T[];
  getLabel: (item: T) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValues: UseFormGetValues<any>;
}

const TagField = <T extends { id: string | number }>({
  name,
  label,
  options,
  getLabel,
  setValue,
  getValues,
}: TagFieldProps<T>) => {
  const values = getValues();
  return (
    <BaseField label={label}>
      <div>
        {options.map((option) => {
          const isSelected = values[name]
            ? values[name].find((item: { id: number }) => item.id === option.id)
            : false;

          const handleClick = () =>
            setValue(
              name,
              isSelected
                ? values[name].filter(
                    (item: { id: number }) => item.id !== option.id
                  )
                : [...values[name], { id: option.id }]
            );

          return (
            <span
              key={option.id}
              onClick={handleClick}
              className={classNames(
                classes.Tag,
                "badge me-3 mb-1 p-2",
                isSelected ? "bg-success" : "bg-light text-dark"
              )}
            >
              {getLabel(option)}
            </span>
          );
        })}
      </div>
    </BaseField>
  );
};

export default TagField;
