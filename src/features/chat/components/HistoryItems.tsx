"use client";

import NavItem from "@/components/layouts/Navbar/NavItem";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { IconHistory } from "@tabler/icons-react";
import { useGetHistoryChats } from "../hooks/useChat";
import { limitToTwoSentences } from "@/lib/utils";

const HistoryItem = () => {
  const { data } = useGetHistoryChats({
    sessionId: `bdce84ef2a9d4cc69fc5d7d57ca90888`,
  });

  console.log("history data = ", data);

  return (
    <>
      {data?.map((item, key) => {
        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton className="w-[180px] h-fit text-gray-400 text-sm">
              <NavItem
                href={`/${item.id}`}
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
