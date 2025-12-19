import { ElementType, ReactNode } from "react";

interface SummaryCardValueProps {
  children: ReactNode;
}

export const SummaryCardValue = ({ children }: SummaryCardValueProps) => {
  return <p className="text-2xl font-semibold text-slate-900">{children}</p>;
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
