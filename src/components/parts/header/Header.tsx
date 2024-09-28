import { FC } from "react";
import classNames from "classnames";
import "./Header.scss";

export type HeaderProps = {
  className?: string;
};

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header className={classNames("header-wrapper", className)} role="header">
      <h1 className="title">都道府県別の総人口推移</h1>
    </header>
  );
};
