import type { Metadata } from "next";
import { ReactQueryProviders } from "./reactQueryProviders";
import { Layout } from "@/components/templates/layout/Layout";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "都道府県別の総人口推移",
  description: "都道府県別の総人口推移をグラフで表示",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProviders>
          <Layout>{children}</Layout>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
