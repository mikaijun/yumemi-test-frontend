import { useCallback, useRef } from "react";
import { CheckboxesProps } from "./Checkboxes";

export const useCheckboxes = ({
  checkboxes,
  onCheckboxChange,
}: Pick<CheckboxesProps, "checkboxes" | "onCheckboxChange">) => {
  const selectedCheckboxesRef = useRef<CheckboxesProps["checkboxes"]>([]);
  const handleCheckboxChange = useCallback(
    (id: string, checked: boolean) => {
      const targetCheckbox = checkboxes.find((checkbox) => checkbox.id === id);
      if (!targetCheckbox) return;
      if (checked) {
        selectedCheckboxesRef.current = [
          ...selectedCheckboxesRef.current,
          targetCheckbox,
        ];
      } else {
        selectedCheckboxesRef.current = selectedCheckboxesRef.current.filter(
          (checkboxId) => checkboxId.id !== id,
        );
      }
      onCheckboxChange(selectedCheckboxesRef.current);
    },
    [checkboxes, onCheckboxChange],
  );

  return { handleCheckboxChange };
};
