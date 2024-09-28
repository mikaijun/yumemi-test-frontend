import { within, expect } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { Layout } from "./Layout";

const meta = {
  title: "Templates/Layout",
  component: Layout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

const testHeader: Story["play"] = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("Headerが正しく表示されていることを確認", async () => {
    const header = await canvas.findByRole("header");
    expect(header).toBeVisible();
  });
  await step("Footerが正しく表示されていることを確認", async () => {
    const footer = await canvas.findByRole("footer");
    expect(footer).toBeVisible();
  });
};

export const Default: Story = {
  args: {
    children: <div style={{ padding: "1rem" }}>children</div>,
  },
  play: testHeader,
};
