// TODO: Github Actionsでテストを確認するためのサンプルStory。後で本実装に置き換える
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { StepFunction } from "storybook/internal/types";
import { Checkbox } from "./Checkbox";

const testCheckbox = async (canvasElement: HTMLElement, step: StepFunction) => {
  const canvas = within(canvasElement);
  const checkbox = await canvas.findByRole("checkbox");

  await step("チェックできること", async () => {
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
};

const meta = {
  title: "Module/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutLabel: Story = {
  play: async ({ canvasElement, step }) => {
    await testCheckbox(canvasElement, step);
  },
};
