import type { Meta, StoryObj } from "@storybook/react";
import { within, expect, screen } from "@storybook/test";
import { StepFunction } from "@storybook/core/types";
import { Graph } from "./Graph";
import {
  generateMockPopulation,
  getMockPrefectures,
  mockGraphLabelProps,
  mockPrefectures,
} from "./Graph.mock";

const testGraphLabels: Story["play"] = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("ラベルが正しく表示されていることを確認", async () => {
    await canvas.findByText(mockGraphLabelProps.xAxisLabel);
    await canvas.findByText(mockGraphLabelProps.yAxisLabel);
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
  const prefectureNames = getMockPrefectures(1).map(
    (prefecture) => prefecture.name,
  );
  await testPrefectureNames(step, prefectureNames);
};

const testTenPrefectures: Story["play"] = async ({ step }) => {
  const prefectureNames = getMockPrefectures(10).map(
    (prefecture) => prefecture.name,
  );
  await testPrefectureNames(step, prefectureNames);
};

const testAllPrefectures: Story["play"] = async ({ step }) => {
  const prefectureNames = mockPrefectures.map((prefecture) => prefecture.name);
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
    data: generateMockPopulation(1),
    lines: getMockPrefectures(1),
    ...mockGraphLabelProps,
  },
  play: async (context) => {
    await testGraphLabels(context);
    await testSinglePrefecture(context);
  },
};

export const Data10: Story = {
  args: {
    data: generateMockPopulation(10),
    lines: getMockPrefectures(10),
    ...mockGraphLabelProps,
  },
  play: async (context) => {
    await testGraphLabels(context);
    await testTenPrefectures(context);
  },
};

export const Data47: Story = {
  args: {
    data: generateMockPopulation(47),
    lines: getMockPrefectures(47),
    ...mockGraphLabelProps,
  },
  play: async (context) => {
    await testGraphLabels(context);
    await testAllPrefectures(context);
  },
};
