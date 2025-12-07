import { IEmployeeResponseDataTypes } from "@/types/employee.types";

export const hitungTotalGaji = (data: IEmployeeResponseDataTypes[]): number => {
  return data.reduce((total, karyawan) => total + karyawan.gaji, 0);
};

// --- 2. Filter Karyawan Baru (30 Hari Terakhir) ---
export const getKaryawanBaru = (data: IEmployeeResponseDataTypes[]): IEmployeeResponseDataTypes[] => {
  const hariIni = new Date();
  const batasWaktu = new Date();
  batasWaktu.setDate(hariIni.getDate() - 30);

  return data.filter((karyawan) => {
    const tglMasuk = new Date(karyawan.tanggal_masuk);
    return tglMasuk >= batasWaktu;
  });
};

type StatistikJabatan = {
  [key: string]: number;
};

export const hitungStatistikJabatan = (data: IEmployeeResponseDataTypes[]): StatistikJabatan => {
  return data.reduce((acc, karyawan) => {
    const posisi = karyawan?.posisi;
    
    acc[posisi!] = (acc[posisi!] || 0) + 1;
    return acc;
  }, {} as StatistikJabatan);
};

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Menghilangkan koma desimal (,00)
    maximumFractionDigits: 0,
  }).format(amount);
};