import { expect, fn, userEvent, within } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkboxes } from "./Checkboxes";

const meta = {
  title: "Templates/Checkboxes",
  component: Checkboxes,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkboxes>;

export default meta;
type Story = StoryObj<typeof meta>;

const checkboxesData = [
  { id: "1", label: "checkbox1" },
  { id: "2", label: "checkbox2" },
  { id: "3", label: "checkbox3" },
];

const testCheckboxes: Story["play"] = async ({ args, canvasElement, step }) => {
  const canvas = within(canvasElement);
  const checkboxes = canvas.getAllByRole("checkbox");
  await step("Checkboxesが正しく表示されていることを確認", async () => {
    await expect(checkboxes).toHaveLength(checkboxes.length);
    for (const checkbox of checkboxes) {
      await expect(checkbox).not.toBeChecked();
    }

    for (const checkbox of checkboxes) {
      await userEvent.click(checkbox);
      await expect(checkbox).toBeChecked();
      await userEvent.click(checkbox);
      await expect(checkbox).not.toBeChecked();
    }
  });

  await step(
    "チェックする度にonChangeの引数の値が増えることを確認",
    async () => {
      for (const checkbox of checkboxes) {
        await userEvent.click(checkbox);
      }
      expect(args.onCheckboxChange).toHaveBeenCalledWith(
        checkboxesData.map((cb) => {
          return {
            id: cb.id,
            label: cb.label,
          };
        }),
      );
    },
  );

  await step(
    "チェックを外すたびにonChangeの引数の値が減ることを確認",
    async () => {
      for (let i = 0; i < checkboxes.length; i++) {
        await userEvent.click(checkboxes[i]);
        const expectedCheckedIds = checkboxesData.slice(i + 1).map((cb) => {
          return {
            id: cb.id,
            label: cb.label,
          };
        });
        expect(args.onCheckboxChange).toHaveBeenCalledWith(expectedCheckedIds);
      }
    },
  );
};

export const Default: Story = {
  args: {
    checkboxes: checkboxesData,
    onCheckboxChange: fn(),
  },
  play: testCheckboxes,
};

export const Vertical: Story = {
  args: {
    checkboxes: checkboxesData,
    onCheckboxChange: fn(),
    layout: "vertical",
  },
  play: testCheckboxes,
};
