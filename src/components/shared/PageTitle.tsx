import { ReactNode } from "react";
import Button from "@/components/shared/Button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import useRouter from "@/i18n/routing/useRouter";

type PageTitleProps = {
  title: string;
  subtitle?: ReactNode;
  backlinkHref?: string;
};

const PageTitle = ({ title, subtitle, backlinkHref }: PageTitleProps) => {
  const router = useRouter();

  const onBackClick = () => {
    if (backlinkHref) {
      router.push(backlinkHref);
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-end gap-4">
        {backlinkHref && (
          <Button icon={<ChevronLeftIcon />} onClick={onBackClick} />
        )}
        <div className="flex flex-col flex-1">
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && <h2 className="text-3xl font-light">{subtitle}</h2>}
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
