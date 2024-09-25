import React, { ComponentPropsWithoutRef, FC } from "react";
import { useCheckbox } from "./Checkbox.hooks";
import "./Checkbox.scss";

export type CheckboxProps = ComponentPropsWithoutRef<"button"> & {
  disabled?: boolean;
  label?: string;
  id?: string;
  onChecked?: (id: string, checked: boolean) => void;
};

export const Checkbox: FC<CheckboxProps> = ({
  disabled,
  label,
  onChecked,
  id = crypto.randomUUID(),
  ...props
}) => {
  const { checkboxRef, handleKeyDown, toggleChecked } = useCheckbox({
    id,
    onChecked,
  });

  return (
    <div className="checkbox-wrapper">
      <button
        aria-checked="false"
        className="unchecked"
        disabled={disabled}
        id={id}
        onClick={toggleChecked}
        onKeyDown={handleKeyDown}
        ref={checkboxRef}
        role="checkbox"
        type="button"
        {...props}
      >
        <span className="mark">✔</span>
      </button>
      {label && (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};
