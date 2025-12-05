"use client";

import NavItem from "@/components/layouts/Navbar/NavItem";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { IconHistory } from "@tabler/icons-react";
import { useGetHistoryChats } from "../hooks/useChat";
import { limitToTwoSentences } from "@/lib/utils";
import { CHAT_ROUTE } from "@/constant/router_name";

const HistoryItem = () => {
  const { data } = useGetHistoryChats({
    sessionId: `9ba416ab003f44a88da596ea9cceee21`,
  });

  console.log("history data = ", data);

  return (
    <>
      {data?.map((item, key) => {
        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton className="w-[180px] h-fit text-gray-400 text-sm">
              <NavItem
                href={`${CHAT_ROUTE}/${item.session_id}`}
                text={limitToTwoSentences(item.message.content)}
                icon={IconHistory}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </>
  );
};

export default HistoryItem;
