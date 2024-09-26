import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { GraphTabs } from "./GraphTabs";
import {
  generatePopulationData,
  getPrefectures,
  labelProps,
} from "@/mock/prefecturePopulation";

const meta = {
  title: "Template/GraphTabs",
  component: GraphTabs,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "32px", maxWidth: "1200px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GraphTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const testGraphLabels: Story["play"] = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  const [firstTab, secondTab] = canvas.getAllByRole("tab");
  await step("ラベルが正しく表示されていることを確認", async () => {
    await canvas.findByText(labelProps.xAxisLabel);
    await canvas.findByText(labelProps.yAxisLabel);
  });

  const initialPanel = canvas.getByRole("tabpanel");

  await step(
    "タブを切り替える前に同じグラフが表示されていることを確認",
    async () => {
      const currentPanel = canvas.getByRole("tabpanel");
      await expect(initialPanel).toBe(currentPanel);
    },
  );

  await step(
    "タブを切り替えた後は違うグラフが表示されていることを確認",
    async () => {
      await userEvent.click(secondTab);
      const newPanel = canvas.getByRole("tabpanel");
      expect(initialPanel).not.toBe(newPanel);
      await userEvent.click(firstTab);
    },
  );
};

export const Default: Story = {
  args: {
    graphData: {
      tab1: [...generatePopulationData(3)],
      tab2: [...generatePopulationData(3)],
      tab3: [...generatePopulationData(3)],
    },
    lines: getPrefectures(3),
    ...labelProps,
  },
  play: testGraphLabels,
};
