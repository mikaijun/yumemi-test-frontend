import { within, expect } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta = {
  title: "Module/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const testFooter: Story["play"] = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("Footerが正しく表示されていることを確認", async () => {
    const footer = await canvas.findByRole("footer");
    expect(footer).toBeVisible();
  });
};

export const Default: Story = {
  play: testFooter,
};
