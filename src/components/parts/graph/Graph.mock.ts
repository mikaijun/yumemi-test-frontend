export const mockPrefectures = [
  { key: 1, name: "北海道" },
  { key: 2, name: "青森県" },
  { key: 3, name: "岩手県" },
  { key: 4, name: "宮城県" },
  { key: 5, name: "秋田県" },
  { key: 6, name: "山形県" },
  { key: 7, name: "福島県" },
  { key: 8, name: "茨城県" },
  { key: 9, name: "栃木県" },
  { key: 10, name: "群馬県" },
  { key: 11, name: "埼玉県" },
  { key: 12, name: "千葉県" },
  { key: 13, name: "東京都" },
  { key: 14, name: "神奈川県" },
  { key: 15, name: "新潟県" },
  { key: 16, name: "富山県" },
  { key: 17, name: "石川県" },
  { key: 18, name: "福井県" },
  { key: 19, name: "山梨県" },
  { key: 20, name: "長野県" },
  { key: 21, name: "岐阜県" },
  { key: 22, name: "静岡県" },
  { key: 23, name: "愛知県" },
  { key: 24, name: "三重県" },
  { key: 25, name: "滋賀県" },
  { key: 26, name: "京都府" },
  { key: 27, name: "大阪府" },
  { key: 28, name: "兵庫県" },
  { key: 29, name: "奈良県" },
  { key: 30, name: "和歌山県" },
  { key: 31, name: "鳥取県" },
  { key: 32, name: "島根県" },
  { key: 33, name: "岡山県" },
  { key: 34, name: "広島県" },
  { key: 35, name: "山口県" },
  { key: 36, name: "徳島県" },
  { key: 37, name: "香川県" },
  { key: 38, name: "愛媛県" },
  { key: 39, name: "高知県" },
  { key: 40, name: "福岡県" },
  { key: 41, name: "佐賀県" },
  { key: 42, name: "長崎県" },
  { key: 43, name: "熊本県" },
  { key: 44, name: "大分県" },
  { key: 45, name: "宮崎県" },
  { key: 46, name: "鹿児島県" },
  { key: 47, name: "沖縄県" },
];

export const mockGraphLabelProps = {
  xAxisLabel: "年(年度)",
  yAxisLabel: "人口(人)",
  xTooltipLabel: "年",
  yTooltipLabel: "人",
};

export const getMockPrefectures = (count: number) =>
  mockPrefectures
    .map((prefecture) => {
      return {
        key: String(prefecture.key),
        name: prefecture.name,
      };
    })
    .slice(0, count);

export const generateMockPopulation = (count: number) => {
  const years = Array.from({ length: 2045 - 1965 + 1 }, (_, i) => 1965 + i);
  const selectedPrefectures = getMockPrefectures(count);
  return years.map((year, index) => ({
    xValue: year,
    yValues: selectedPrefectures.reduce(
      (pop, prefecture) => {
        const initialPopulation =
          Math.floor(Math.random() * 50000000) + 5000000;
        const decreaseRate = 0.005;
        const populationForYear = Math.floor(
          initialPopulation * Math.pow(1 - decreaseRate, index * 3),
        );
        pop[Number(prefecture.key)] = populationForYear;
        return pop;
      },
      {} as Record<number, number>,
    ),
  }));
};
