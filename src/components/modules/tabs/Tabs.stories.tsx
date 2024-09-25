import type { Meta, StoryObj } from "@storybook/react";
import { within, expect, userEvent } from "@storybook/test";
import { Tabs } from "./Tabs";

const tabs = [
  {
    id: "tab1",
    tab: "Tab 1",
    tabPanel: "Tab Panel 1",
  },
  {
    id: "tab2",
    tab: "Tab 2",
    tabPanel: "Tab Panel 2",
  },
  {
    id: "tab3",
    tab: "Tab 3",
    tabPanel: "Tab Panel 3",
  },
  {
    id: "tab4",
    tab: "Tab 4",
    tabPanel: "Tab Panel 4",
  },
];

const meta = {
  title: "Module/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const testTabs: Story["play"] = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  const [tab1, tab2, tab3, tab4] = canvas.getAllByRole("tab");
  const panel = canvas.getByRole("tabpanel");

  // @see https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/#kbd_label
  await step("キーボードショートカットが正常に動作すること", async () => {
    await userEvent.tab();
    await expect(tab1).toHaveFocus();
    await userEvent.tab();
    await expect(panel).toHaveFocus();

    tab1.focus();
    await userEvent.keyboard("[ArrowRight]");
    await expect(tab2).toHaveFocus();
    await userEvent.keyboard("[ArrowRight]");
    await expect(tab3).toHaveFocus();

    tab1.focus();
    await userEvent.keyboard("[ArrowLeft]");
    await expect(tab4).toHaveFocus();
    await userEvent.keyboard("[ArrowLeft]");
    await expect(tab3).toHaveFocus();

    tab2.focus();
    await userEvent.keyboard("[Home]");
    await expect(tab1).toHaveFocus();

    tab1.focus();
    await userEvent.keyboard("[End]");
    await expect(tab4).toHaveFocus();
  });

  await step("タブを切り替えることができること", async () => {
    await userEvent.click(tab2);
    const panel2 = canvas.getByRole("tabpanel");
    await expect(panel2).toHaveTextContent(tabs[1].tabPanel!.toString());

    await userEvent.click(tab1);
    const panel1 = canvas.getByRole("tabpanel");
    await expect(panel1).toHaveTextContent(tabs[0].tabPanel!.toString());
  });
};

export const Default: Story = {
  args: {
    tabs,
  },
  play: testTabs,
};
