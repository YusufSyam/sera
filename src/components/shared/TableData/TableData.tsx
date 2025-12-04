import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITableDataPropsType } from "./types";

export const TableData = ({ columns, data }: ITableDataPropsType<any>) => {
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          {columns.map((item, key) => {
            return <TableHead key={key}>{item.label}</TableHead>;
          })}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, i) => {
          return (
            <TableRow key={i + 1}>
              {/* <TableCell>{i + 1}</TableCell> */}
              {columns.map((c) => {
                return (
                  <TableCell key={String(c.key)}>
                    {String(row[c.key])}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
