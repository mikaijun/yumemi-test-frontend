import React, { FC } from "react";
import classNames from "classnames";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  ResponsiveContainerProps,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Graph.scss";

export type GraphProps = Partial<ResponsiveContainerProps> & {
  data: {
    xValue: number | string;
    yValues: Record<string, number>;
  }[];
  lines: { key: string; name: string }[];
  xAxisLabel: string;
  yAxisLabel: string;
  xTooltipLabel: string;
  yTooltipLabel: string;
  className?: string;
};

export const Graph: FC<GraphProps> = ({
  data,
  lines,
  xAxisLabel,
  yAxisLabel,
  xTooltipLabel,
  yTooltipLabel,
  className,
  ...props
}) => {
  return (
    <div className={classNames("graph-wrapper", className)}>
      <ResponsiveContainer className="container" height={440} {...props}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 40, left: 80, bottom: 30 }}
        >
          <CartesianGrid />
          <XAxis dataKey="xValue">
            <Label position="bottom" value={xAxisLabel} />
          </XAxis>
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat().format(Number(value))
            }
          >
            <Label angle={-90} dx={-45} position="left" value={yAxisLabel} />
          </YAxis>
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderColor: "grey",
              margin: "10px",
            }}
            formatter={(value, name) => [
              new Intl.NumberFormat().format(Number(value)),
              name,
            ]}
            labelFormatter={(value) => `${value}${xTooltipLabel}`}
          />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ paddingBottom: "0.5rem" }}
          />
          {lines.map(({ key, name }, index) => {
            const lineColor = getStrokeColor(index);
            return (
              <Line
                activeDot={{ fill: lineColor }}
                dataKey={`yValues.${key}`}
                key={key}
                name={name}
                stroke={lineColor}
                unit={yTooltipLabel}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const colors = [
  "dodgerblue",
  "coral",
  "limegreen",
  "gold",
  "mediumorchid",
  "darkcyan",
  "lightsalmon",
  "deepskyblue",
  "tomato",
  "forestgreen",
  "crimson",
  "blueviolet",
  "fuchsia",
  "royalblue",
  "yellowgreen",
  "darkorange",
  "indianred",
  "seagreen",
  "saddlebrown",
  "teal",
  "purple",
  "salmon",
  "lightskyblue",
  "darkgoldenrod",
  "palevioletred",
  "rosybrown",
  "slategray",
  "steelblue",
  "darkslateblue",
];

const getStrokeColor = (index: number) => {
  return colors[index % colors.length];
};
