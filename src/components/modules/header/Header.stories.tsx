import { within, expect } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta = {
  title: "Module/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const testHeader: Story["play"] = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("Headerが正しく表示されていることを確認", async () => {
    const header = await canvas.findByRole("header");
    expect(header).toBeVisible();
  });
};

export const Default: Story = {
  play: testHeader,
};
