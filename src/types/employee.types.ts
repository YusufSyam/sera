import { IJabatanResponseApiType } from "./jabatan.types";

export interface IEmployeeResponseApiDataTypes {
  nama: string;
  gaji: number;
  tanggal_masuk: string;
  jabatan: IJabatanResponseApiType;
}

export interface IEmployeeResponseDataTypes {
  id: number;
  nama: string;
  gaji: number;
  tanggal_masuk: string;
  posisi: string;
}

export interface IInsertEmployeRequestApiDataTypes {
  nama: string;
  gaji: number;
  tanggal_masuk: Date;
  jabatan_id: number;
}
