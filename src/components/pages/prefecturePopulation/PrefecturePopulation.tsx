"use client";

import { FC, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  transformPopulationDataForGraph,
  usePrefecturePopulation,
} from "./PrefecturePopulation.hooks";
import { ErrorFallback } from "@/components/modules/errorFallback";
import { Checkboxes, CheckboxesProps } from "@/components/templates/checkboxes";
import { GraphTabs } from "@/components/templates/graphTabs";
import { Loader } from "@/components/modules/loader";
import { useFetchPrefecturePopulation } from "#useFetchPrefecturePopulation";
import "./PrefecturePopulation.scss";

type PrefecturePopulationProps = {
  prefectureCheckboxes: CheckboxesProps["checkboxes"];
};

export const PrefecturePopulation: FC<PrefecturePopulationProps> = ({
  prefectureCheckboxes,
}) => {
  const { selectedCheckboxes, handleCheckboxChange } =
    usePrefecturePopulation();
  return (
    <div className="prefecture-population-wrapper">
      <Checkboxes
        checkboxes={prefectureCheckboxes}
        className="checkboxes"
        onCheckboxChange={handleCheckboxChange}
      />
      <Suspense
        fallback={
          <div className="loader">
            <Loader />
          </div>
        }
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PrefectureGraphTabs prefectureCheckboxes={selectedCheckboxes} />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

const PrefectureGraphTabs: FC<PrefecturePopulationProps> = ({
  prefectureCheckboxes,
}) => {
  const results = useFetchPrefecturePopulation({
    prefectureCheckboxes,
  });
  const { data, prefectures } = transformPopulationDataForGraph(results);
  return (
    <GraphTabs
      className="tabs"
      graphData={data}
      lines={prefectures}
      xAxisLabel="年(年度)"
      xTooltipLabel="年"
      yAxisLabel="人口(人)"
      yTooltipLabel="人"
    />
  );
};
