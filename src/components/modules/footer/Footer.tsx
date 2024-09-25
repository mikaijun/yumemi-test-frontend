import { FC } from "react";
import classNames from "classnames";
import "./Footer.scss";

export type FooterProps = {
  className?: string;
};

export const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <footer className={classNames("footer-wrapper", className)} role="footer">
      <p className="text">Copyright &copy; 2024 mikai jun</p>
    </footer>
  );
};
