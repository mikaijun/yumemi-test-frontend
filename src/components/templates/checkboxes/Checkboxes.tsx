import { FC, ComponentPropsWithoutRef } from "react";
import classNames from "classnames";
import { useCheckboxes } from "./Checkboxes.hooks";
import { Checkbox, CheckboxProps } from "@/components/modules/checkbox";
import "./Checkboxes.scss";

type CheckboxOption = Required<Pick<CheckboxProps, "label" | "id">>;

export type CheckboxesProps = ComponentPropsWithoutRef<"div"> & {
  checkboxes: CheckboxOption[];
  onCheckboxChange: (selectedCheckValues: CheckboxOption[]) => void;
  layout?: "horizontal" | "vertical";
};

export const Checkboxes: FC<CheckboxesProps> = ({
  checkboxes,
  layout = "horizontal",
  className,
  onCheckboxChange,
  ...props
}) => {
  const { handleCheckboxChange } = useCheckboxes({
    checkboxes,
    onCheckboxChange,
  });
  const containerClass =
    layout === "horizontal" ? "checkboxes-horizontal" : "checkboxes-vertical";

  return (
    <div className={classNames(containerClass, className)} {...props}>
      {checkboxes.map((checkbox) => (
        <Checkbox
          key={checkbox.id}
          onChecked={handleCheckboxChange}
          {...checkbox}
        />
      ))}
    </div>
  );
};
