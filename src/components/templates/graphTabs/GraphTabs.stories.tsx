import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { GraphTabs } from "./GraphTabs";
import {
  generateMockPopulation,
  getMockPrefectures,
  mockGraphLabelProps,
} from "@/components/parts/graph/Graph.mock";

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
    await canvas.findByText(mockGraphLabelProps.xAxisLabel);
    await canvas.findByText(mockGraphLabelProps.yAxisLabel);
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
      tab1: [...generateMockPopulation(3)],
      tab2: [...generateMockPopulation(3)],
      tab3: [...generateMockPopulation(3)],
    },
    lines: getMockPrefectures(3),
    ...mockGraphLabelProps,
  },
  play: testGraphLabels,
};
