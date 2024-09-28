import { ComponentPropsWithoutRef, FC } from "react";
import classNames from "classnames";
import "./Loader.scss";

type LoaderProps = ComponentPropsWithoutRef<"div"> & {
  size?: string;
};

export const Loader: FC<LoaderProps> = ({ size, className, ...props }) => {
  return (
    <div
      className={classNames("loader-wrapper", className)}
      role="loader"
      style={{ width: size }}
      {...props}
    />
  );
};
