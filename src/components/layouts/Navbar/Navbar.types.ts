import { Icon } from "@tabler/icons-react";
import { LinkProps } from "next/link";

export interface INavItemPropsType extends LinkProps {
  text: string;
  icon: Icon;
  customStyle?: boolean;
}
