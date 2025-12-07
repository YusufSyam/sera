"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { IconMenu3 } from "@tabler/icons-react";

const SidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button className="block md:hidden m-4" onClick={toggleSidebar}>
      <IconMenu3 size={30} />
    </button>
  );
};

export default SidebarTrigger;
