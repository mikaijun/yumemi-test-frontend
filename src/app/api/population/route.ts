type Data = {
  label: string;
  data: {
    year: number;
    value: number;
    rate: number;
  }[];
};

export type Population = {
  // 実績値と推計値の区切り年
  boundaryYear: number;
  data: [
    Omit<Data, "data"> & {
      label: "総人口";
      data: Omit<Data["data"][number], "rate">[];
    },
    Data & { label: "年少人口" },
    Data & { label: "生産年齢人口" },
    Data & { label: "老年人口" },
  ];
};

// TODO: 以下にAPIの処理を追加する
