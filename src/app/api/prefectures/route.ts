import { NextResponse } from "next/server";
import { fetchResasApi } from "../resas-helper";

export type Prefecture = {
  // 都道府県コード
  prefCode: number;
  // 都道府県名
  prefName: string;
};

export type Prefectures = Prefecture[];

/**
 * 都道府県一覧を取得するAPI
 *
 * @see https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
 */
export async function GET(): Promise<NextResponse<Prefectures>> {
  const res = await fetchResasApi<Prefectures>("/prefectures");
  return NextResponse.json(res);
}
