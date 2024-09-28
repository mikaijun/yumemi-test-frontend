import { within, expect, fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { ErrorFallback } from "./ErrorFallback";

const testError: Story["play"] = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("Errorが正しく表示されていることを確認", async () => {
    const error = await canvas.findByRole("error");
    expect(error).toBeVisible();
  });
};

const meta = {
  title: "Module/ErrorFallback",
  tags: ["autodocs"],
  component: ErrorFallback,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ErrorFallback>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: {
      message: "An error has occurred.",
    },
    resetErrorBoundary: fn(),
  },
  play: testError,
};
