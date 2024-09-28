import { fn } from "@storybook/test";
import { CheckboxesProps } from "@/components/templates/checkboxes";
import {
  generateMockPopulation,
  mockPrefectures,
} from "@/components/parts/graph/Graph.mock";
import { FetchPrefecturePopulationType } from "#useFetchPrefecturePopulation";

const mockPopulation = generateMockPopulation(47);

const prefecturePopulation: FetchPrefecturePopulationType = mockPrefectures.map(
  ({ key, name }) => {
    const prefCode = key;
    const prefName = name;
    const randomFactor = Math.floor(Math.random() * 5000) / 5000;
    const randomStartValue = Math.floor(Math.random() * 5000) + 500;
    return {
      prefCode,
      prefName,
      populationData: [
        {
          label: "総人口",
          data: mockPopulation.map(({ xValue, yValues }) => ({
            year: xValue,
            value: yValues[1] * randomFactor + randomStartValue,
            rate: yValues[0] * randomFactor + randomStartValue,
          })),
        },
        {
          label: "年少人口",
          data: mockPopulation.map(({ xValue, yValues }) => ({
            year: xValue,
            value: yValues[1] * randomFactor + randomStartValue,
            rate: yValues[0] * randomFactor + randomStartValue,
          })),
        },
        {
          label: "生産年齢人口",
          data: mockPopulation.map(({ xValue, yValues }) => ({
            year: xValue,
            value: yValues[2] * randomFactor + randomStartValue,
            rate: yValues[0] * randomFactor + randomStartValue,
          })),
        },
        {
          label: "老年人口",
          data: mockPopulation.map(({ xValue, yValues }) => ({
            year: xValue,
            value: yValues[3] * randomFactor + randomStartValue,
            rate: yValues[0] * randomFactor + randomStartValue,
          })),
        },
      ],
    };
  },
);

export const useFetchPrefecturePopulation = fn(
  (args: {
    prefectureCheckboxes: CheckboxesProps["checkboxes"];
  }): FetchPrefecturePopulationType => {
    return prefecturePopulation.filter(({ prefCode }) =>
      args.prefectureCheckboxes.some(({ id }) => id === prefCode.toString()),
    );
  },
).mockName("useFetchPrefecturePopulation");
