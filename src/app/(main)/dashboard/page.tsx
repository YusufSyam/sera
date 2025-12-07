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
  Pencil,
  Plus,
  Trash2,
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
import {
  useDeleteEmployee,
  useInsertEmployee,
  useUpdateEmployee,
} from "@/features/employee/hooks/useEmployee";
import { useToast } from "@/hooks/use-toast";
import EditEmployeeForm, { IEditEmployeeData } from "./EditEmployeeForm";

const DashboardPage = () => {
  const [employees, setEmployees] = useState<IEmployeeResponseDataTypes[]>([]);
  const [selectedEmployee, setSelectedEmployee] =
    useState<IEditEmployeeData | null>(null);
  const [deletedEmployeeId, setDeletedEmployeeId] = useState(0);

  const [showInsertForm, setShowInsertForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
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
  const {
    mutate: insertEmployee,
    isPending: isInserting,
    isSuccess: isInsertSuccess,
  } = useInsertEmployee();
  const { mutate: editEmployee, isPending: isRemoving } = useUpdateEmployee();
  const { mutate: removeEmployee, isPending: isEditing } = useDeleteEmployee();

  console.log("data", data);
  useEffect(() => {
    refetch();
  }, [isInsertSuccess]);

  useEffect(() => {
    if (data) {
      setEmployees(data as IEmployeeResponseDataTypes[]);
      setLoading(false);
    }
  }, [data]);
  const totalEmployeePages = Math.ceil(employees.length / employeesPerPage);

  const handleCreateEmployee = (data: IInsertEmployeRequestApiDataTypes) => {
    const formattedDate = data?.tanggal_masuk?.toISOString()?.split("T")[0];

    const payload: any[] = [
      {
        ...data,
        tanggal_masuk: formattedDate,
      },
    ];

    insertEmployee(payload, {
      onSuccess: () => {
        toast({
          title: "Berhasil!",
          description: "Data karyawan berhasil ditambahkan.",
          variant: "default",
        });
        console.log("ke sukses");
        refetch();
        setShowInsertForm(false);
      },
      onError: (error) => {
        toast({
          title: "Gagal",
          description: `Terjadi kesalahan: ${error?.message}`,
          variant: "destructive",
        });
        console.log("ke error");
        setShowInsertForm(false);
      },
    });
  };
  const handleSaveEdit = (
    id: number,
    values: Partial<IInsertEmployeRequestApiDataTypes>
  ) => {
    editEmployee(
      {
        id: id,
        payload: values,
      },
      {
        onSuccess: () => {
          refetch();

          toast({
            title: "Berhasil!",
            description: "Data karyawan berhasil diperbarui.",
            variant: "default",
          });
          setShowEditForm(false);
        },
        onError: (error) => {
          console.error(error);

          toast({
            title: "Gagal",
            description: `Terjadi kesalahan: ${error?.message}`,
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleDelete = (id: number) => {

    removeEmployee(id, {
      onSuccess: () => {
        refetch();

        toast({
          title: "Berhasil!",
          description: "Data karyawan berhasil dihapus.",
          variant: "default",
        });
        setShowDeleteForm(false)
      },
      onError: (error) => {
        console.error(error);

        toast({
          title: "Gagal",
          description: `Terjadi kesalahan: ${error?.message}`,
          variant: "destructive",
        });
        setShowDeleteForm(false)
      },
    });
  };

  const handleEditClick = (
    employeeData: IEmployeeResponseDataTypes,
    id: number
  ) => {
    setSelectedEmployee({
      id: id,
      nama: employeeData?.nama,
      gaji: employeeData?.gaji,
      jabatan_id: employeeData?.jabatan_id,
      tanggal_masuk: new Date(employeeData?.tanggal_masuk),
    });
    setShowEditForm(true);
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

      <Dialog open={showInsertForm} onOpenChange={setShowInsertForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Data Karyawan</DialogTitle>
            <DialogDescription>
              Lengkapi formulir berikut untuk menambahkan data pegawai baru ke
              dalam sistem
            </DialogDescription>
          </DialogHeader>
          <AddEmployeeForm
            onSubmit={handleCreateEmployee}
            onCancel={() => setShowInsertForm(false)}
            isLoading={isInserting}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteForm} onOpenChange={setShowDeleteForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Hapus Data Karyawan</DialogTitle>
            <DialogDescription>Yakin ingin menghapus data?</DialogDescription>
          </DialogHeader>
          <div className="flex flex-row gap-4 self-end">
            <Button
              variant="outline"
              onClick={() => setShowDeleteForm(false)}
              title="cancel"
            >
              Batal
            </Button>

            <Button
              variant="destructive"
              onClick={() => handleDelete(deletedEmployeeId)}
              title="Hapus"
            >
              Hapus
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Data Karyawan</DialogTitle>
            <DialogDescription>
              Lakukan perubahan pada data pegawai di bawah ini. Pastikan data
              sudah benar sebelum disimpan
            </DialogDescription>
          </DialogHeader>
          <EditEmployeeForm
            initialData={selectedEmployee!} // Pass data pegawai yang dipilih
            onSubmit={handleSaveEdit} // Pass fungsi submit
            onCancel={() => setShowEditForm(false)} // Pass fungsi tutup modal
            isLoading={isEditing} // Pass status loading
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
                  onClick={() => setShowInsertForm(true)}
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
                        <TableCell className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleEditClick(employee, employee?.id)
                            }
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              setDeletedEmployeeId(employee.id);
                              setShowDeleteForm(true);
                            }}
                            title="Hapus"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
