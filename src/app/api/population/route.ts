import { NextRequest, NextResponse } from "next/server";
import { fetchResasApi } from "../resas-helper";

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

/**
 * 人口構成データを取得するAPI
 *
 * @see https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const prefCode = searchParams.get("prefCode") ?? "";

  const params = new URLSearchParams({
    prefCode: prefCode.toString(),
    cityCode: "-",
  });
  const res = await fetchResasApi<Population>(
    `/population/composition/perYear?${params}`,
  );
  return NextResponse.json(res.data);
}
