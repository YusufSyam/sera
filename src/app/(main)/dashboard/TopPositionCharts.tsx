import { IEmployeeResponseDataTypes } from '@/types/employee.types';
import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface TopPositionChartsProps {
  dataKaryawan: IEmployeeResponseDataTypes[];
}

export interface ChartDataJabatan {
    name: string;
    count: number;
}

const BAR_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

export const TopPositionCharts: React.FC<TopPositionChartsProps> = ({ dataKaryawan }) => {
  // --- Logic Pengolahan Data (Menggunakan useMemo agar efisien) ---
  const processedData: ChartDataJabatan[] = useMemo(() => {
    // 1. Hitung frekuensi setiap posisi/jabatan
    const counts: Record<string, number> = {};
    dataKaryawan.forEach((karyawan) => {
      const posisi = karyawan.posisi;
      counts[posisi!] = (counts[posisi!] || 0) + 1;
    });

    // 2. Ubah ke format array object yang diminta Recharts
    const chartDataArray: ChartDataJabatan[] = Object.entries(counts).map(
      ([name, count]) => ({
        name,
        count,
      })
    );

    // 3. Urutkan dari yang terbanyak (descending) dan ambil 5 teratas
    return chartDataArray
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

  }, [dataKaryawan]);

  // --- Render Component ---
  if (processedData.length === 0) {
    return <p className="text-gray-500 text-center py-10">Belum ada data jabatan.</p>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Jabatan Terbanyak</h3>

      {/* Container agar chart responsif terhadap lebar layar */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
             {/* Garis grid tipis di belakang */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />

            {/* Sumbu X (Nama Jabatan) */}
            <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                // angle={-45} textAnchor="end" height={60}
            />

            {/* Sumbu Y (Jumlah Orang) */}
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />

            {/* Tooltip saat hover */}
            <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none' }}
                formatter={(value: number) => [`${value} Orang`, 'Jumlah']}
            />

            {/* Batang Chart */}
            <Bar dataKey="count" name="Jumlah Karyawan" radius={[4, 4, 0, 0]}>
                {processedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};