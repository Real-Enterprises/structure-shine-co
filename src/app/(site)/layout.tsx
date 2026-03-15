import { MainLayout } from "@/components/layout";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
