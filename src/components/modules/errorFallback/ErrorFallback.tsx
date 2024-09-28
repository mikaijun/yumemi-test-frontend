"use client";

import { FC } from "react";
import { FallbackProps } from "react-error-boundary";

type ErrorFallbackProps = FallbackProps;

export const ErrorFallback: FC<ErrorFallbackProps> = ({ error }) => {
  return (
    <section className="error-fallback-wrapper" role="error">
      <h2 className="title">エラーが発生しました。</h2>
      <p className="message">{error!.message}</p>
    </section>
  );
};
