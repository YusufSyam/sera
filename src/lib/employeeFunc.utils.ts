import { IEmployeeResponseDataTypes } from "@/types/employee.types";

export const countTotalSalary = (data: IEmployeeResponseDataTypes[]): number => {
  return data.reduce((total, employee) => total + employee.gaji, 0);
};

export const getNewEmployees = (data: IEmployeeResponseDataTypes[]): IEmployeeResponseDataTypes[] => {
  const today = new Date();
  const timeThreshold = new Date();
  timeThreshold.setDate(today.getDate() - 30);

  return data.filter((employee) => {
    const tglMasuk = new Date(employee.tanggal_masuk);
    return tglMasuk >= timeThreshold;
  });
};

type IJobsStatistics = {
  [key: string]: number;
};

export const countJobsStatistics = (data: IEmployeeResponseDataTypes[]): IJobsStatistics => {
  return data.reduce((acc, employee) => {
    const posisi = employee?.posisi;
    
    acc[posisi!] = (acc[posisi!] || 0) + 1;
    return acc;
  }, {} as IJobsStatistics);
};

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Menghilangkan koma desimal (,00)
    maximumFractionDigits: 0,
  }).format(amount);
};