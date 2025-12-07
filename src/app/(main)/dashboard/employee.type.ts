import { IEmployeeResponseDataTypes } from "@/types/employee.types";

export interface IJabatan {
  id: number;
  nama_jabatan: string;
}

export interface IPegawai {
  id: number;
  nama: string;
  gaji: number;
  tanggal_masuk: Date;
  jabatan_id: number;
}

// Data Dummy Jabatan
export const dummyJabatan: IJabatan[] = [
  { id: 1, nama_jabatan: "Manager Toko" },
  { id: 2, nama_jabatan: "Kasir" },
  { id: 3, nama_jabatan: "Staf Gudang" },
  { id: 4, nama_jabatan: "Sales / Marketing" },
];

// Data Dummy Karyawan (Format Frontend dengan Join)
// export const dummyPegawai: IEmployeeResponseDataTypes[] = [
//   {
//     id: 1,
//     nama: "Budi Santoso",
//     gaji: 5000000,
//     tanggal_masuk: new Date("2023-01-15"),
//     jabatan_id: 1,
//   },
//   {
//     id: 2,
//     nama: "Siti Aminah",
//     gaji: 3200000,
//     tanggal_masuk: new Date("2023-05-20"),
//     jabatan_id: 2,
//   },
//   {
//     id: 3,
//     nama: "Joko Widodo",
//     gaji: 3000000,
//     tanggal_masuk: new Date("2024-02-10"),
//     jabatan_id: 3,
//   },
//   {
//     id: 4,
//     nama: "Rina Kartika",
//     gaji: 3500000,
//     tanggal_masuk: new Date("2023-11-01"),
//     jabatan_id: 2,
//   },
//   {
//     id: 5,
//     nama: "Dedi Corbuzier",
//     gaji: 2800000,
//     tanggal_masuk: new Date("2024-06-01"),
//     jabatan_id: 3,
//   },
// ];
