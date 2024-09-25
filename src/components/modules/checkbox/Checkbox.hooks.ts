import { useCallback, useRef } from "react";
import { CheckboxProps } from "./Checkbox";

export const useCheckbox = ({ id, onChecked }: CheckboxProps) => {
  const checkboxRef = useRef<HTMLButtonElement | null>(null);

  const toggleChecked = useCallback(() => {
    const checkboxElement = checkboxRef.current;
    if (checkboxElement) {
      const isCurrentlyChecked =
        checkboxElement.getAttribute("aria-checked") === "true";
      const newChecked = !isCurrentlyChecked;

      checkboxElement.setAttribute("aria-checked", String(newChecked));
      checkboxElement.classList.toggle("checked", newChecked);
      if (onChecked && id) {
        onChecked(id, newChecked);
      }
    }
  }, [id, onChecked]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === " ") {
        event.preventDefault();
        toggleChecked();
      }
    },
    [toggleChecked],
  );

  return { checkboxRef, handleKeyDown, toggleChecked };
};
