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
import {
  useGetDetailHistoryChats,
  useGetHistoryChats,
} from "@/features/chat/hooks/useChat";
import { useGetAllEmployees } from "@/features/chat/hooks/useEmployees";
import {
  countTotalSalary,
  formatRupiah,
  getNewEmployees,
} from "@/lib/employeeFunc.utils";
import {
  IEmployeeResponseDataTypes,
  IInsertEmployeRequestApiDataTypes,
} from "@/types/employee.types";
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
import { formatDate } from "@/lib/dateFuncs.utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddEmployeeForm from "./AddEmployeeForm";
import { useInsertEmployee } from "@/features/employee/hooks/useEmployee";
import { useToast } from "@/hooks/use-toast";

const DashboardPage = () => {
  const [employees, setEmployees] = useState<IEmployeeResponseDataTypes[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [employeesPage, setEmployeePage] = useState(1);
  const { toast } = useToast();
  const employeesPerPage = 10;

  const indexOfLastEmployee = employeesPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalSalary = countTotalSalary(employees);
  const newEmployees = getNewEmployees(employees);

  const { data: todaysChatData } = useGetDetailHistoryChats({
    sessionId: getSessionIdPerDay(),
  });

  const { data, isLoading, refetch } = useGetAllEmployees();
  const { mutate: insertEmployee, isSuccess: isInsertSuccess } = useInsertEmployee();

  console.log("data", data);
  useEffect(() => {
    refetch()
  }, [isInsertSuccess])

  useEffect(() => {
    if (data) {
      setEmployees(data as IEmployeeResponseDataTypes[]);
      setLoading(false);
    }
  }, [data]);
  const totalEmployeePages = Math.ceil(employees.length / employeesPerPage);


  const handleCreateEmployee = (data: IInsertEmployeRequestApiDataTypes) => {
    const formattedDate = data?.tanggal_masuk?.toISOString()?.split("T")[0];

    const payload : any[] = [{
      ...data,
      tanggal_masuk: formattedDate,
    }];

    // console.log(payload, 'payload')

    insertEmployee(payload, {
      onSuccess: () => {
        toast({
          title: "Berhasil!",
          description: "Data karyawan berhasil ditambahkan.",
          variant: "default",
        });
        console.log('ke sukses')
        setShowForm(false); 
      },
      onError: (error) => {
        toast({
          title: "Gagal",
          description: `Terjadi kesalahan: ${error?.message}`,
          variant: "destructive",
        }); 
        console.log('ke error')
        setShowForm(false); 
      },
    });
  };

  return (
    <section className="w-full px-8 py-5">
      <h1 className="text-xl md:text-2xl font-medium mt-4">
        Dashboard <br />
        <p className="text-gray-500 font-light text-sm">
          Pantau metrik utama dan akses seluruh data operasional secara
          mendetail
        </p>
      </h1>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Data Karyawan</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
              suscipit?
            </DialogDescription>
          </DialogHeader>
          <AddEmployeeForm
            onSubmit={handleCreateEmployee}
            onCancel={() => setShowForm(false)}
            isLoading={false}
          />
        </DialogContent>
      </Dialog>

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
                <div className="text-2xl font-bold">{newEmployees?.length}</div>
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
                  {formatRupiah(totalSalary)}
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

          <Card>
            <CardHeader>
              <div className="flex flex-row justify-between w-full">
                <div className="gap-1 flex">
                  <CardTitle>Daftar Karyawan</CardTitle>
                </div>
                <Button
                  color="blue"
                  className="bg-linear-to-bl from-[#01AFFF] to-[#006AFF]  text-white cursor-pointer"
                  onClick={() => setShowForm(true)}
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
                        <TableCell>
                          {formatDate(new Date(employee.tanggal_masuk))}
                        </TableCell>
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
          <Card>
            <CardHeader>
              <CardTitle>Distribusi Jabatan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TopPositionCharts employeeData={employees} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
