import { FC } from "react";

import { Tabs } from "@/components/parts/tabs";
import { Graph, GraphProps } from "@/components/parts/graph";

type GraphTabsProps = Omit<GraphProps, "data"> & {
  graphData: Record<string, GraphProps["data"]>;
};

export const GraphTabs: FC<GraphTabsProps> = ({
  graphData,
  className,
  ...props
}) => {
  return (
    <Tabs
      className={className}
      tabs={Object.entries(graphData).map(([label, data]) => ({
        id: label,
        tab: label,
        tabPanel: <Graph data={data} {...props} />,
      }))}
    />
  );
};
