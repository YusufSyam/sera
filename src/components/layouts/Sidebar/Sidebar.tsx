import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarItemsData } from "@/lib/shared.utils";
import NavItem from "../Navbar/NavItem";

const SidebarApp = () => {
  return (
    <Sidebar>
      <SidebarHeader></SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-5">
              {sidebarItemsData.map((item) => {
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      className={`w-[180px] h-10 text-base ${
                        item.customStyle
                          ? "bg-linear-to-bl from-[#01AFFF] to-[#006AFF]  text-white"
                          : "hover:text-blue-500"
                      }`}
                    >
                      <NavItem
                        href={item.href}
                        icon={item.icon}
                        text={item.text}
                        key={item.id}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarApp;
