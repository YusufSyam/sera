import { PropsWithChildren } from "react";

export interface ITableDataPropsType<T> extends PropsWithChildren {
  columns: { key: keyof T; label: string }[];
  data: T[];
}
