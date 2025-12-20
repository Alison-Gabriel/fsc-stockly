import { Skeleton } from "@/app/_components/ui/skeleton";
import { ElementType, ReactNode } from "react";

interface SummaryCardValueProps {
  children: ReactNode;
}

export const SummaryCardValue = ({ children }: SummaryCardValueProps) => {
  return (
    <p className="mt-1 text-2xl font-semibold text-slate-900">{children}</p>
  );
};

interface SummaryCardTitleProps {
  children: ReactNode;
}

export const SummaryCardTitle = ({ children }: SummaryCardTitleProps) => {
  return <p className="text-sm font-medium text-slate-500">{children}</p>;
};

interface SummaryCardIconProps {
  icon: ElementType;
}

export const SummaryCardIcon = ({ icon: Icon }: SummaryCardIconProps) => {
  return (
    <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500">
      <Icon />
    </div>
  );
};

interface SummaryCardProps {
  children: ReactNode;
}

export const SummaryCard = ({ children }: SummaryCardProps) => {
  return <div className="rounded-xl bg-white p-6">{children}</div>;
};

export const SummaryCardSkeleton = () => {
  return (
    <Skeleton className="max-h-full rounded-xl bg-white p-6">
      <div>
        <Skeleton className="mb-2 h-9 w-9 rounded-md" />
        <div>
          <Skeleton className="h-5 w-20" />
          <Skeleton className="mt-1 h-8 w-[140px]" />
        </div>
      </div>
    </Skeleton>
  );
};
