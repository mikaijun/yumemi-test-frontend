import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
