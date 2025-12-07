"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetDetailHistoryChats, useGetHistoryChats } from "@/features/chat/hooks/useChat";
import { useGetAllEmployees } from "@/features/chat/hooks/useEmployees";
import {
  formatRupiah,
  getKaryawanBaru,
  hitungStatistikJabatan,
  hitungTotalGaji,
} from "@/lib/employeeFunc.utils";
import { IEmployeeResponseDataTypes } from "@/types/employee.types";
import {
  BanknoteArrowUp,
  BrainCircuit,
  Plus,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TopPositionCharts } from "./TopPositionCharts";
import { getSessionIdPerDay } from "@/lib/utils";

const DashboardPage = () => {
  const [employees, setEmployees] = useState<IEmployeeResponseDataTypes[]>([]);

  const [loading, setLoading] = useState(true);
  const [employeesPage, setEmployeePage] = useState(1);
  const employeesPerPage = 10;

  const indexOfLastEmployee = employeesPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalGaji = hitungTotalGaji(employees);
  const karyawanBaru = getKaryawanBaru(employees);
  const statistikJabatan = hitungStatistikJabatan(employees);

  console.log("statistikJabatan", statistikJabatan);

  const { data: todaysChatData } = useGetDetailHistoryChats({
    sessionId: getSessionIdPerDay(),
  });

  const { data, isLoading } = useGetAllEmployees();
  console.log("data", data);
  useEffect(() => {
    if (data) {
      setEmployees(data as IEmployeeResponseDataTypes[]);
      setLoading(false);
    }
  }, [data]);

  console.log(
    "currentEmployees,indexOfFirstEmployee, indexOfLastEmployee",
    currentEmployees,
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalEmployeePages = Math.ceil(employees.length / employeesPerPage);
  return (
    <section className="w-full px-8 py-5">
      <h1 className="text-xl md:text-2xl font-medium mt-4">
        Dashboard <br />
        <p className="text-gray-500 font-light text-sm">
          Pantau metrik utama dan akses seluruh data operasional secara
          mendetail
        </p>
      </h1>

      <div className="my-12">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Karyawan
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employees?.length}</div>
                <p className="text-xs text-muted-foreground">
                  Seluruh pegawai aktif
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Karyawan Baru
                </CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{karyawanBaru?.length}</div>
                <p className="text-xs text-muted-foreground">
                  Karyawan yang Bergabung bulan ini
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Beban Gaji
                </CardTitle>
                <BanknoteArrowUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatRupiah(totalGaji)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Estimasi pengeluaran bulanan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Interaksi AI Hari Ini
                </CardTitle>
                <BrainCircuit className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {todaysChatData?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Perintah diproses hari ini
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Jabatan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(statistikJabatan).map(([jabatan, jumlah]) => (
                  <div
                    key={jabatan}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-success" />
                      <span className="text-sm">{jabatan}</span>
                    </div>
                    <span className="font-medium">{jumlah}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Daftar Jabatan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <TopPositionCharts dataKaryawan={employees} />
              </CardContent>
            </Card>

            {/* <Card>
                <CardHeader>
                  <CardTitle>Status Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Selesai</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dalam Proses</span>
                    <span className="font-medium">6</span>
                  </div>
                  <Link to="/workorders">
                    <Button variant="outline" className="w-full mt-4">
                      Detail Maintenance
                    </Button>
                  </Link>
                </CardContent>
              </Card> */}
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-row justify-between w-full">
                <div className="gap-1 flex">
                  <CardTitle>Daftar Karyawan</CardTitle>
                </div>
                <Button
                  color="blue"
                  className="bg-linear-to-bl from-[#01AFFF] to-[#006AFF]  text-white"
                >
                  <Plus className="h-4 w-4" />
                  <p>Tambah Karyawan</p>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">No</TableHead>
                    <TableHead>Nama Lengkap</TableHead>
                    <TableHead>Jabatan</TableHead>
                    <TableHead>Gaji</TableHead>
                    <TableHead>Tanggal Masuk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEmployees.map(
                    (employee: IEmployeeResponseDataTypes, index: number) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          {indexOfFirstEmployee + index + 1}
                        </TableCell>
                        <TableCell>{employee.nama}</TableCell>
                        <TableCell>{employee.posisi}</TableCell>
                        <TableCell>{formatRupiah(employee.gaji)}</TableCell>
                        <TableCell>{employee.tanggal_masuk}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>

              {employees?.length > 1 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (employeesPage > 1)
                              setEmployeePage(employeesPage - 1);
                          }}
                          className={
                            employeesPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                      {Array.from(
                        { length: totalEmployeePages },
                        (_, i) => i + 1
                      ).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setEmployeePage(page);
                            }}
                            isActive={employeesPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (employeesPage < totalEmployeePages)
                              setEmployeePage(employeesPage + 1);
                          }}
                          className={
                            employeesPage === totalEmployeePages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
