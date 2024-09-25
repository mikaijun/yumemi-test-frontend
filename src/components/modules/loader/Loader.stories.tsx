import { within, expect } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "./Loader";

const testLoader: Story["play"] = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("Loaderが正しく表示されていることを確認", async () => {
    const loader = await canvas.findByRole("loader");
    expect(loader).toBeVisible();
  });
};

const meta = {
  title: "Module/Loader",
  tags: ["autodocs"],
  component: Loader,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Loader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: testLoader,
};
export const Large: Story = {
  args: {
    size: "100px",
  },
  play: testLoader,
};
