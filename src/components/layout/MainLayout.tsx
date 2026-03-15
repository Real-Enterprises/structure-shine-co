import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getCompanyInfo } from "@/lib/content";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const companyInfo = getCompanyInfo();

  return (
    <div className="min-h-screen flex flex-col">
      <Header phone={companyInfo.phone} />
      <main className="flex-1">{children}</main>
      <Footer companyInfo={companyInfo} />
      <WhatsAppButton whatsappNumber={companyInfo.whatsappNumber} />
    </div>
  );
}
