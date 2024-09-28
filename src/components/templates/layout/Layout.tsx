import { FC } from "react";
import { Header } from "@/components/parts/header";
import { Footer } from "@/components/parts/footer";
import "./Layout.scss";

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="main">{children}</main>
      <Footer className="footer" />
    </div>
  );
};
