import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { IInsertEmployeRequestApiDataTypes } from "@/types/employee.types";
import { useGetAllJobs } from "@/features/employee/hooks/useEmployee";

interface AddEmployeeFormProps {
  onSubmit: (data: IInsertEmployeRequestApiDataTypes) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const AddEmployeeForm = ({
  onSubmit,
  onCancel,
  isLoading,
}: AddEmployeeFormProps) => {
  const { data: jobsData, isLoading: isJobsLoading } = useGetAllJobs();

  const [formData, setFormData] = useState<IInsertEmployeRequestApiDataTypes>({
    nama: "",
    gaji: 0,
    tanggal_masuk: new Date(),
    jabatan_id: 0,
  });
  const isDataReady = !isJobsLoading && jobsData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.jabatan_id === 0) {
      alert("Mohon pilih jabatan terlebih dahulu");
      return;
    }
    onSubmit(formData);
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  if (!isDataReady) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-sm text-gray-500">
          Memuat data jabatan...
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="nama">Nama Lengkap</Label>
          <Input
            id="nama"
            placeholder="Contoh: Budi Santoso"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="jabatan">Jabatan</Label>
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, jabatan_id: Number(value) })
            }
          >
            <SelectTrigger id="jabatan">
              <SelectValue placeholder="Pilih Jabatan" />
            </SelectTrigger>
            <SelectContent>
              {jobsData?.map((job: any) => (
                <SelectItem key={job.id} value={job.id.toString()}>
                  {job.nama_jabatan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="gaji">Gaji Pokok (Rp)</Label>
          <Input
            id="gaji"
            type="number"
            min={0}
            placeholder="0"
            value={formData.gaji}
            onChange={(e) =>
              setFormData({ ...formData, gaji: Number(e.target.value) })
            }
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="tanggal_masuk">Tanggal Masuk</Label>
          <Input
            id="tanggal_masuk"
            type="date"
            value={formatDateForInput(formData.tanggal_masuk)}
            onChange={(e) =>
              setFormData({
                ...formData,
                tanggal_masuk: new Date(e.target.value),
              })
            }
            required
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-linear-to-bl from-[#01AFFF] to-[#006AFF]  text-white cursor-pointer"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Tambah
        </Button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
