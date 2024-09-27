import { useCallback, useState } from "react";
import { CheckboxesProps } from "@/components/templates/checkboxes";
import { GraphProps } from "@/components/modules/graph";
import { Population } from "@/app/api/population/route";
import { FetchPrefecturePopulationType } from "#useFetchPrefecturePopulation";

type TransformPopulationDataForGraphProps = {
  data: Record<Population["data"][number]["label"], GraphProps["data"]>;
  prefectures: GraphProps["lines"];
};

export const usePrefecturePopulation = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    CheckboxesProps["checkboxes"]
  >([]);

  const handleCheckboxChange = useCallback(
    (selectedCheckValues: CheckboxesProps["checkboxes"]) => {
      setSelectedCheckboxes(selectedCheckValues);
    },
    [],
  );

  return { selectedCheckboxes, handleCheckboxChange };
};

export const transformPopulationDataForGraph = (
  data: FetchPrefecturePopulationType,
): TransformPopulationDataForGraphProps => {
  const prefectures = data.map(({ prefCode, prefName }) => ({
    key: String(prefCode),
    name: prefName,
  }));

  const transformedData: TransformPopulationDataForGraphProps["data"] = {
    年少人口: [],
    生産年齢人口: [],
    老年人口: [],
    総人口: [],
  };

  data.forEach(({ populationData, prefCode }) => {
    populationData.forEach(({ label, data }) => {
      data.forEach(({ year, value }) => {
        const dataInYear = transformedData[label].find(
          (d) => d.xValue === year,
        );
        if (dataInYear) {
          dataInYear.yValues[prefCode] = value;
        } else {
          transformedData[label].push({
            xValue: year,
            yValues: { [prefCode]: value },
          });
        }
      });
    });
  });

  return { data: transformedData, prefectures };
};
