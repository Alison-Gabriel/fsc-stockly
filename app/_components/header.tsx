import { ReactNode } from "react";

interface HeaderTitleProps {
  children: ReactNode;
}

export const HeaderTitle = ({ children }: HeaderTitleProps) => {
  return <h1 className="text-xl font-semibold">{children}</h1>;
};

interface HeaderSubtitleProps {
  children: ReactNode;
}

export const HeaderSubtitle = ({ children }: HeaderSubtitleProps) => {
  return <p className="text-primary text-xs font-semibold">{children}</p>;
};

interface HeaderLeftProps {
  children: ReactNode;
}

export const HeaderLeft = ({ children }: HeaderLeftProps) => {
  return <div className="space-y-2">{children}</div>;
};

interface HeaderRightProps {
  children: ReactNode;
}

export const HeaderRight = ({ children }: HeaderRightProps) => {
  return <>{children}</>;
};

interface HeaderProps {
  children: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className="flex w-full items-center justify-between">
      {children}
    </header>
  );
};
