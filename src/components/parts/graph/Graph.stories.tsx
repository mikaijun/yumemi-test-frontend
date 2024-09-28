import type { Meta, StoryObj } from "@storybook/react";
import { within, expect, screen } from "@storybook/test";
import { StepFunction } from "@storybook/core/types";
import { Graph } from "./Graph";
import {
  generatePopulationData,
  getPrefectures,
  labelProps,
  prefectures,
} from "@/mock/prefecturePopulation";

const testGraphLabels: Story["play"] = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("ラベルが正しく表示されていることを確認", async () => {
    await canvas.findByText(labelProps.xAxisLabel);
    await canvas.findByText(labelProps.yAxisLabel);
  });
};

const testPrefectureNames = async (
  step: StepFunction,
  prefectureNames: string[],
) => {
  await step("グラフの上に都道府県名が正常に表示されること", async () => {
    prefectureNames.forEach((name) => {
      expect(screen.queryByText(new RegExp(name))).toBeInTheDocument();
    });
  });
};

const testSinglePrefecture: Story["play"] = async ({ step }) => {
  const prefectureNames = getPrefectures(1).map(
    (prefecture) => prefecture.name,
  );
  await testPrefectureNames(step, prefectureNames);
};

const testTenPrefectures: Story["play"] = async ({ step }) => {
  const prefectureNames = getPrefectures(10).map(
    (prefecture) => prefecture.name,
  );
  await testPrefectureNames(step, prefectureNames);
};

const testAllPrefectures: Story["play"] = async ({ step }) => {
  const prefectureNames = prefectures.map((prefecture) => prefecture.name);
  await testPrefectureNames(step, prefectureNames);
};

const meta = {
  title: "Parts/Graph",
  component: Graph,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Graph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Data1: Story = {
  args: {
    data: generatePopulationData(1),
    lines: getPrefectures(1),
    ...labelProps,
  },
  play: async (context) => {
    await testGraphLabels(context);
    await testSinglePrefecture(context);
  },
};

export const Data10: Story = {
  args: {
    data: generatePopulationData(10),
    lines: getPrefectures(10),
    ...labelProps,
  },
  play: async (context) => {
    await testGraphLabels(context);
    await testTenPrefectures(context);
  },
};

export const Data47: Story = {
  args: {
    data: generatePopulationData(47),
    lines: getPrefectures(47),
    ...labelProps,
  },
  play: async (context) => {
    await testGraphLabels(context);
    await testAllPrefectures(context);
  },
};
