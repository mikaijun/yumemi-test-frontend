import { useSuspenseQueries } from "@tanstack/react-query";
import { CheckboxesProps } from "@/components/templates/checkboxes";
import { Population } from "@/app/api/population/route";

export type FetchPrefecturePopulationType = {
  populationData: Population["data"];
  prefCode: number;
  prefName: string;
}[];

const fetchPopulationData = async (prefCode: string) => {
  const params = new URLSearchParams({
    prefCode: prefCode.toString(),
    cityCode: "-",
  });
  const res = await fetch(`api/population?${params}`);
  const data: Population["data"] = await res.json();
  return { data };
};

export const useFetchPrefecturePopulation = ({
  prefectureCheckboxes,
}: {
  prefectureCheckboxes: CheckboxesProps["checkboxes"];
}): FetchPrefecturePopulationType => {
  const queries = prefectureCheckboxes.map(({ label, id }) => ({
    queryKey: ["population-data", id],
    queryFn: () =>
      fetchPopulationData(id).then(({ data }) => ({
        prefCode: Number(id),
        prefName: label,
        populationData: data,
      })),
  }));

  const results = useSuspenseQueries({ queries });

  return results.map((r) => r.data);
};
