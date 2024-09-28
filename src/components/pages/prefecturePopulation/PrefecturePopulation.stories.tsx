import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, screen } from "@storybook/test";
import { PrefecturePopulation } from "./PrefecturePopulation";
import {
  mockGraphLabelProps,
  mockPrefectures,
} from "@/components/parts/graph/Graph.mock";

const FIRST_PREFECTURE_INDEX = 0;
const SECOND_PREFECTURE_INDEX = 1;

const verifyLabelsNotDisplayed = async (canvas: ReturnType<typeof within>) => {
  await expect(
    canvas.queryByText(mockGraphLabelProps.xAxisLabel),
  ).not.toBeInTheDocument();
  await expect(
    canvas.queryByText(mockGraphLabelProps.yAxisLabel),
  ).not.toBeInTheDocument();
};

const verifyLabelsDisplayed = async (canvas: ReturnType<typeof within>) => {
  await canvas.findByText(mockGraphLabelProps.xAxisLabel);
  await canvas.findByText(mockGraphLabelProps.yAxisLabel);
};

const toggleCheckbox = async (
  canvas: ReturnType<typeof within>,
  index: number,
  expectedState: "true" | "false",
) => {
  const checkboxes = canvas.getAllByRole("checkbox");
  const checkbox = checkboxes[index];
  await userEvent.click(checkbox);
  await expect(checkbox).toHaveAttribute("aria-checked", expectedState);
};

const switchTabAndVerify = async (
  canvas: ReturnType<typeof within>,
  initialPanel: HTMLElement,
  firstTab: HTMLElement,
  secondTab: HTMLElement,
) => {
  await userEvent.click(secondTab);
  const newPanel = canvas.getByRole("tabpanel");
  expect(initialPanel).not.toBe(newPanel);
  await userEvent.click(firstTab);
};

const testPrefecturePopulation: Story["play"] = async ({
  canvasElement,
  step,
}) => {
  const canvas = within(canvasElement);
  const [firstTab, secondTab] = canvas.getAllByRole("tab");
  const initialPanel = canvas.getByRole("tabpanel");

  await step(
    "チェックが1つもされていないときはラベルが表示されないこと",
    async () => {
      await verifyLabelsNotDisplayed(canvas);
    },
  );

  await step(
    "チェックした数だけグラフの上に都道府県名が正常に表示されること",
    async () => {
      await toggleCheckbox(canvas, FIRST_PREFECTURE_INDEX, "true");
      await toggleCheckbox(canvas, SECOND_PREFECTURE_INDEX, "true");
      const selectedPrefectures = mockPrefectures.slice(
        FIRST_PREFECTURE_INDEX,
        SECOND_PREFECTURE_INDEX + 1,
      );
      selectedPrefectures.forEach((prefecture) => {
        const elements = screen.queryAllByText(new RegExp(prefecture.name));
        expect(elements.length).toBe(selectedPrefectures.length);
      });
    },
  );

  await step(
    "1つ以上チェックが入っている時はラベルが表示されること",
    async () => {
      await verifyLabelsDisplayed(canvas);
    },
  );

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
      await switchTabAndVerify(canvas, initialPanel, firstTab, secondTab);
    },
  );

  await step(
    "全てのチェックボックが外れたはラベルが表示されないこと",
    async () => {
      await toggleCheckbox(canvas, FIRST_PREFECTURE_INDEX, "false");
      await toggleCheckbox(canvas, SECOND_PREFECTURE_INDEX, "false");
      await verifyLabelsNotDisplayed(canvas);
    },
  );
};

const meta = {
  title: "Pages/PrefecturePopulation",
  component: PrefecturePopulation,
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
} satisfies Meta<typeof PrefecturePopulation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prefectureCheckboxes: mockPrefectures.map((prefecture) => ({
      id: prefecture.key.toString(),
      label: prefecture.name,
    })),
  },
  play: testPrefecturePopulation,
};
