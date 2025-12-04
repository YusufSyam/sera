import { useGetAllEmployes } from "../hooks/useEmployee";
import { TableData } from "@/components/shared/TableData/TableData";

const employeeColumnsData = [
  {
    key: "nama",
    label: "Nama",
  },
  {
    key: "gaji",
    label: "Gaji",
  },
  {
    key: "tanggal_masuk",
    label: "Tanggal Masuk",
  },
  {
    key: "posisi",
    label: "Posisi",
  },
];

const EmployeeTable = () => {
  const { data } = useGetAllEmployes();

  return (
    <TableData columns={employeeColumnsData} data={data ?? []}></TableData>
  );
};

export default EmployeeTable;
