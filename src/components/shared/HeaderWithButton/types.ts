import { Icon } from "@tabler/icons-react";
import { PropsWithChildren } from "react";

export interface IHeaderWithButtonPropsType extends PropsWithChildren {
  title: string;
  description: string;
  icon: Icon;
}
