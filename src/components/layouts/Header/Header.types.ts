import { PropsWithChildren } from "react";

export interface IHeaderPropsType extends PropsWithChildren {
  text: string;
  textColor?: string;
  href: string;
}

export interface IHeaderLogoPropsType extends PropsWithChildren {
  align: "right" | "left";
}
