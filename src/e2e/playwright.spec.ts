import { test, expect, Page } from "@playwright/test";
import { Population } from "@/app/api/population/route.js";

const BASE_URL = "http://localhost:3000/";
const PREFECTURES = {
  HOKKAIDO: "北海道",
  AOMORI: "青森県",
};
const TAB_NAMES = {
  YOUNG_POPULATION: "年少人口",
  WORKING_AGE_POPULATION: "生産年齢人口",
  ELDERLY_POPULATION: "老年人口",
  TOTAL_POPULATION: "総人口",
};

const verifyGraphVisibility = async (
  page: Page,
  tabName: string,
  prefecture: string,
  isVisible: boolean,
) => {
  const currentTab = await page.getByLabel(tabName);
  const graphLabel = currentTab.getByText(prefecture);
  if (isVisible) {
    await expect(graphLabel).toBeVisible();
  } else {
    await expect(graphLabel).not.toBeVisible();
  }
};

test.describe("UI操作の確認", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("タイトル表示されているか確認する", async ({ page }) => {
    const title = await page.title();
    expect(title).toBe("都道府県別の総人口推移");
  });

  test("タブをクリックしてのナビゲーションを確認する", async ({ page }) => {
    for (const tabName of Object.values(TAB_NAMES)) {
      await page.getByRole("tab", { name: tabName }).click();
      const activeTab = await page.getByRole("tab", { selected: true });
      expect(activeTab).toHaveText(tabName);
    }
  });

  test("タブをキーボード操作してのナビゲーションを確認する", async ({
    page,
  }) => {
    const tabNames = Object.values(TAB_NAMES);

    for (let i = 0; i < tabNames.length; i++) {
      await page.getByRole("tab", { name: tabNames[i] }).click();
      await page.keyboard.press("ArrowRight");
      const activeTab = await page.getByRole("tab", { selected: true });
      const nextTabName = tabNames[(i + 1) % tabNames.length];
      expect(activeTab).toHaveText(nextTabName);
    }

    for (let i = tabNames.length - 1; i >= 0; i--) {
      await page.getByRole("tab", { name: tabNames[i] }).click();
      await page.keyboard.press("ArrowLeft");
      const activeTab = await page.getByRole("tab", { selected: true });
      const prevTabName = tabNames[(i - 1 + tabNames.length) % tabNames.length];
      expect(activeTab).toHaveText(prevTabName);
    }
  });

  test("チェックボックスをクリックして都道府県グラフの表示・非表示を確認する", async ({
    page,
  }) => {
    await page.getByLabel(PREFECTURES.HOKKAIDO).click();
    await page.getByLabel(PREFECTURES.AOMORI).dblclick();
    await page.waitForSelector(".loader-wrapper", { state: "hidden" });
    await verifyGraphVisibility(
      page,
      TAB_NAMES.YOUNG_POPULATION,
      PREFECTURES.HOKKAIDO,
      true,
    );
    await verifyGraphVisibility(
      page,
      TAB_NAMES.YOUNG_POPULATION,
      PREFECTURES.AOMORI,
      false,
    );
  });

  test("チェックボックスのラベルをクリックして都道府県グラフの表示・非表示を確認する", async ({
    page,
  }) => {
    await page.getByText(PREFECTURES.HOKKAIDO).click();
    await page.getByText(PREFECTURES.AOMORI).dblclick();
    await page.waitForSelector(".loader-wrapper", { state: "hidden" });
    await verifyGraphVisibility(
      page,
      TAB_NAMES.YOUNG_POPULATION,
      PREFECTURES.HOKKAIDO,
      true,
    );
    await verifyGraphVisibility(
      page,
      TAB_NAMES.YOUNG_POPULATION,
      PREFECTURES.AOMORI,
      false,
    );
  });

  test("チェックボックスをキーボード操作しての都道府県グラフの表示・非表示を確認する", async ({
    page,
  }) => {
    await page.getByLabel(PREFECTURES.HOKKAIDO).press("Tab");
    await page.getByLabel(PREFECTURES.AOMORI).press("Shift+Tab");
    // NOTE: 北海道が選択された状態でスペースキーを押してチェックを入れる
    page.keyboard.press("Space");
    await page.getByLabel(PREFECTURES.HOKKAIDO).press("Tab");
    // NOTE: 青森県が選択された状態でスペースキーを2回押してチェックを外す
    page.keyboard.press("Space");
    page.keyboard.press("Space");
    await verifyGraphVisibility(
      page,
      TAB_NAMES.YOUNG_POPULATION,
      PREFECTURES.HOKKAIDO,
      true,
    );
    await verifyGraphVisibility(
      page,
      TAB_NAMES.YOUNG_POPULATION,
      PREFECTURES.AOMORI,
      false,
    );
  });
});

test.describe("グラフ表示の数値確認", () => {
  let hokkaidoPopulationJson: Population["data"];

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByLabel(PREFECTURES.HOKKAIDO).click();
    await page.waitForSelector(".loader-wrapper", { state: "hidden" });

    // NOTE: 北海道の人口構成データを取得するAPI
    const hokkaidoPopulation = await fetch(
      `${BASE_URL}/api/population?prefCode=1&cityCode=-`,
    );
    hokkaidoPopulationJson = await hokkaidoPopulation.json();
  });

  test("グラフの一番左の点をクリックしてtooltipの数値がRESAS APIと同じことを確認", async ({
    page,
  }) => {
    for (const tabName of Object.values(TAB_NAMES)) {
      await page.getByRole("tab", { name: tabName }).click();
      const populationData = hokkaidoPopulationJson.find(
        (item) => item.label === tabName,
      )?.data;
      if (!populationData || populationData.length === 0) {
        throw new Error(`${tabName} data not found`);
      }
      const population = populationData[0].value;
      const formattedPopulation = `${new Intl.NumberFormat().format(population)}人`;
      await page.locator(".recharts-dot").first().click();
      await expect(page.locator(`text=${formattedPopulation}`)).toBeVisible();
    }
  });
});
