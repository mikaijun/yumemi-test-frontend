"use client";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "予期せぬエラーが発生しました",
};

export default function GlobalError() {
  return (
    <main>
      <h2>予期せぬエラーが発生しました</h2>
      <p>お手数ですが、再度お試しいただくか、</p>
      <p style={{ marginBottom: "1rem" }}>時間をおいてアクセスしてください。</p>
      <Link href="/">HOMEに戻る</Link>
    </main>
  );
}
