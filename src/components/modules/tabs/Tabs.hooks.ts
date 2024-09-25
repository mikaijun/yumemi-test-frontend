import { useRef, useState, KeyboardEvent } from "react";
import { useCallback } from "react";
import { TabsProps } from "./Tabs";

export const useTabs = ({ tabs }: TabsProps) => {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const tabsRef = useRef<HTMLButtonElement[]>([]);

  const handleTabClick = useCallback(
    (id: string) => () => {
      setActiveTabId(id);
    },
    [],
  );
  /**
   * キーボード操作によるタブの切り替え
   * @see https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/#kbd_label
   */
  const handleKeyDown = useCallback(
    (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
      const focusTab = (newIndex: number) => {
        const tab = tabs[newIndex];
        const tabRef = tabsRef.current[newIndex];
        tabRef.focus();
        setActiveTabId(tab.id);
      };

      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          focusTab((index + 1) % tabs.length);
          break;
        case "ArrowLeft":
          event.preventDefault();
          focusTab((index - 1 + tabs.length) % tabs.length);
          break;
        case "Home":
          event.preventDefault();
          focusTab(0);
          break;
        case "End":
          event.preventDefault();
          focusTab(tabs.length - 1);
          break;
      }
    },
    [tabs, tabsRef, setActiveTabId],
  );

  return { activeTabId, tabsRef, handleTabClick, handleKeyDown };
};
