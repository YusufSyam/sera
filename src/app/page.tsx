import HeaderApp from "@/components/layouts/Header/Header";
import InputWithButton from "@/components/shared/InputWithButton/InputWithButton";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full px-5">
      <SidebarTrigger className="block md:hidden" />
      <HeaderApp
        text="Lihat Dashboard Anda"
        textColor="text-blue-500"
      ></HeaderApp>

      <h1 className="text-3xl md:text-5xl font-medium text-center mt-52">
        Build your Employee <br /> Data Instantly
      </h1>

      <InputWithButton />
      {children}
    </main>
  );
}
