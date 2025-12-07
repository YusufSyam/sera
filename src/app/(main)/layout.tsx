import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarApp from "@/components/layouts/Sidebar/Sidebar";
import { outfit } from "@/lib/font.utils";
import HeaderApp from "@/components/layouts/Header/Header";
import TanstackProvider from "@/providers/TanstackProvider";
import SidebarTrigger from "@/components/shared/SidebarTrigger/SidebarTrigger";
import HeaderLogo from "@/components/layouts/Header/HeaderLogo";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Sera AI",
  description: "Chatbot S.E.R.A (Smart Employee Relations Assistant)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarApp />
      <main className="w-full">
        <HeaderApp
          text="Lihat Dashboard Anda"
          textColor="text-blue-500"
          href="/dashboard"
        ></HeaderApp>

        <div className="flex flex-row  justify-between">
          <SidebarTrigger />

          <HeaderLogo align="right" />
        </div>

        <Toaster />
        
        {children}
      </main>
    </SidebarProvider>
  );
}
