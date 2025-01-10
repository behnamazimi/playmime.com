import { ReactNode } from "react";

type PageTitleProps = {
  title: string;
  subtitle?: ReactNode;
};

const PageTitle = ({ title, subtitle }: PageTitleProps) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold">{title}</h2>
    {subtitle && <h2 className="text-3xl font-light">{subtitle}</h2>}
  </div>
);

export default PageTitle;
