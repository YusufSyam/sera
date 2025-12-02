import { Icon } from "@tabler/icons-react";
import { PropsWithChildren } from "react";

export interface IFormModalPropsType extends PropsWithChildren {
  title: string;
  description: string;
  icon: Icon;
  btnText: string;
}
