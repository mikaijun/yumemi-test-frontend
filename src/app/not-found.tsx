import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お探しのページが見つかりません",
};

export default function Page() {
  return (
    <main>
      <h2>お探しのページが見つかりませんでした。</h2>
      <p>ご指定のURLが間違っているか、</p>
      <p style={{ marginBottom: "1rem" }}>
        ページが移動または削除された可能性があります。
      </p>
      <Link href="/">HOMEに戻る</Link>
    </main>
  );
}
