import { ComponentPropsWithoutRef, FC, ReactNode, useId } from "react";
import classNames from "classnames";
import "./Tabs.scss";
import { useTabs } from "./Tabs.hooks";

type Tab = {
  id: string;
  tab: ReactNode;
  tabPanel: ReactNode;
};

export type TabsProps = ComponentPropsWithoutRef<"div"> & {
  tabs: Tab[];
};

export const Tabs: FC<TabsProps> = ({ tabs, className, ...props }) => {
  const { activeTabId, tabsRef, handleTabClick, handleKeyDown } = useTabs({
    tabs,
  });
  const baseId = useId();

  return (
    <section className={classNames("tab-wrapper", className)} {...props}>
      <nav className="list">
        {tabs.map((tab, i) => (
          <button
            aria-controls={`${baseId}-panel-${tab.id}`}
            aria-selected={activeTabId === tab.id}
            className="tab"
            id={`${baseId}-tab-${tab.id}`}
            key={tab.id}
            onClick={handleTabClick(tab.id)}
            onKeyDown={handleKeyDown(i)}
            ref={(node) => {
              if (node) tabsRef.current[i] = node;
            }}
            role="tab"
            tabIndex={activeTabId === tab.id ? 0 : -1}
          >
            {tab.tab}
          </button>
        ))}
      </nav>
      {tabs.map((tab) =>
        tab.id === activeTabId ? (
          <article
            aria-labelledby={`${baseId}-tab-${tab.id}`}
            className="panel"
            id={`${baseId}-panel-${tab.id}`}
            key={tab.id}
            role="tabpanel"
            tabIndex={0}
          >
            {tab.tabPanel}
          </article>
        ) : null,
      )}
    </section>
  );
};
