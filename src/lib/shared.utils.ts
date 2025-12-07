import {
  IconEdit,
  IconLayoutDashboard,
  IconReceipt2,
  IconUsersGroup,
} from "@tabler/icons-react";

export const sidebarItemsData = [
  {
    id: 1,
    text: "New Chat",
    icon: IconEdit,
    href: "/",
    customStyle: true,
  },
  {
    id: 2,
    text: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    id: 3,
    text: "Employee",
    icon: IconUsersGroup,
    href: "/employee",
  },
];
