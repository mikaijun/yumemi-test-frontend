import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { StepFunction } from "storybook/internal/types";
import { Checkbox } from "./Checkbox";

const checkboxId = "checkbox-id";
const checkboxLabel = "label";

type CheckboxArgs = {
  id?: string;
  onChecked?: (id: string, checked: boolean) => void;
};

const findCheckbox = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  return await canvas.findByRole("checkbox");
};

const testCheckboxInteractions = async (
  checkbox: HTMLElement,
  step: StepFunction,
) => {
  await step("checkboxクリックでチェックつけ外しができること", async () => {
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "true");

    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
  });

  await step("checkboxがフォーカスできること", async () => {
    checkbox.focus();
    await expect(checkbox).toHaveFocus();

    await userEvent.tab({ shift: true });
    await expect(checkbox).not.toHaveFocus();

    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
  });

  await step("checkboxがキーボードで操作できること", async () => {
    checkbox.focus();
    await userEvent.keyboard("[Space]");
    await expect(checkbox).toHaveAttribute("aria-checked", "true");

    await userEvent.keyboard("[Space]");
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
  });
};

const testCheckboxWithLabel = async (
  args: CheckboxArgs,
  canvasElement: HTMLElement,
  step: StepFunction,
) => {
  const checkbox = await findCheckbox(canvasElement);
  await testCheckboxInteractions(checkbox, step);

  const canvas = within(canvasElement);

  await step("labelクリックでチェックつけ外しができること", async () => {
    const label = await canvas.findByText(checkboxLabel);
    await userEvent.click(label);
    await expect(checkbox).toHaveAttribute("aria-checked", "true");

    await userEvent.click(label);
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
  });

  await step("チェックする度にonChangeの引数の値が変化すること", async () => {
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(args.onChecked).toHaveBeenCalledWith(checkboxId, true);

    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(args.onChecked).toHaveBeenCalledWith(checkboxId, false);
  });
};

const testDisabledCheckbox = async (
  canvasElement: HTMLElement,
  step: StepFunction,
) => {
  const checkbox = await findCheckbox(canvasElement);
  const canvas = within(canvasElement);

  await step("checkboxがクリックできないこと", async () => {
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
  });

  await step("labelがクリックできないこと", async () => {
    const label = await canvas.findByText(checkboxLabel);
    await userEvent.click(label);
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
  });

  await step("checkboxがフォーカスできないこと", async () => {
    checkbox.focus();
    await expect(checkbox).not.toHaveFocus();
  });

  await step("checkboxがキーボードで操作できないこと", async () => {
    checkbox.focus();
    await userEvent.keyboard("[Space]");
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
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

export const Default: Story = {
  args: {
    onChecked: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const checkbox = await findCheckbox(canvasElement);
    await testCheckboxInteractions(checkbox, step);
  },
};

export const WithLabel: Story = {
  args: {
    id: checkboxId,
    label: checkboxLabel,
    onChecked: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    await testCheckboxWithLabel(args, canvasElement, step);
  },
};

export const Disabled: Story = {
  args: {
    label: checkboxLabel,
    id: checkboxId,
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    await testDisabledCheckbox(canvasElement, step);
  },
};
