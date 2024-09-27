import { Population } from "@/app/api/population/route";
import { CheckboxesProps } from "@/components/templates/checkboxes/Checkboxes";

export type FetchPrefecturePopulationType = {
  populationData: Population["data"];
  prefCode: number;
  prefName: string;
}[];

// NOTE: Mockを定義するために仮のメソッドを定義
// TODO: 以下にAPIの処理を追加する
export const useFetchPrefecturePopulation = ({}: {
  prefectureCheckboxes: CheckboxesProps["checkboxes"];
}): FetchPrefecturePopulationType => {
  return [];
};
