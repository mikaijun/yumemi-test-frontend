import { Suspense } from "react";
import { headers } from "next/headers";
import { Prefectures } from "./api/prefectures/route";
import { PrefecturePopulation } from "@/components/pages/prefecturePopulation";

export default async function Home() {
  return (
    <Suspense>
      <PrefecturePopulationPage />
    </Suspense>
  );
}

const PrefecturePopulationPage = async () => {
  const baseUrl = headers().get("base-url");
  const prefectures: Prefectures = await fetch(`${baseUrl}/api/prefectures`, {
    cache: "no-store",
  }).then((response) => response.json());
  const prefectureCheckboxes = prefectures.map((prefecture) => {
    return {
      id: prefecture.prefCode.toString(),
      label: prefecture.prefName,
    };
  });
  return <PrefecturePopulation prefectureCheckboxes={prefectureCheckboxes} />;
};
