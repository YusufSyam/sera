import { IEmployeeResponseDataTypes } from "@/types/employee.types";
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TopPositionChartsProps {
  employeeData: IEmployeeResponseDataTypes[];
}

export interface IChartEmployeeData {
  name: string;
  count: number;
}
const BAR_COLORS = [
  "#93D8F3", 
  "#3EAAD4",
  "#FFB1C0",
  "#252525",
  "#BDE8F9",
];

export const TopPositionCharts: React.FC<TopPositionChartsProps> = ({
  employeeData,
}) => {
  const processedData: IChartEmployeeData[] = useMemo(() => {
    const counts: Record<string, number> = {};
    employeeData.forEach((employee) => {
      const position = employee.posisi;
      counts[position!] = (counts[position!] || 0) + 1;
    });

    const chartDataArray: IChartEmployeeData[] = Object.entries(counts).map(
      ([name, count]) => ({
        name,
        count,
      })
    );

    return chartDataArray.sort((a, b) => b.count - a.count).slice(0, 20);
  }, [employeeData]);

  if (processedData.length === 0) {
    return (
      <p className="text-gray-500 text-center py-10">Belum ada data jabatan.</p>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg">
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
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.5}
            />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
            />

            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />

            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{ borderRadius: "8px", border: "none" }}
              formatter={(value: number) => [`${value} Orang`, "Jumlah"]}
            />

            <Bar dataKey="count" name="Jumlah employee" radius={[4, 4, 0, 0]}>
              {processedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={BAR_COLORS[index % BAR_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
