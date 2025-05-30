import { ReactNode } from "react";

interface SetupLayoutProps {
  children: ReactNode;
}

export default function SetupLayout({ children }: SetupLayoutProps) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
