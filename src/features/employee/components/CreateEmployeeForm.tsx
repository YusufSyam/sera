import FormModal from "@/components/shared/FormModal/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconUsersGroup } from "@tabler/icons-react";

const CreateEmployeeForm = () => {
  return (
    <FormModal
      btnText="+ Tambah Employee"
      title="Employee"
      description="Silahkan Input data karyawan anda"
      icon={IconUsersGroup}
    >
      <div className="grid grid-cols-2 gap-5">
        <div className="grid gap-3">
          <Label htmlFor="name">Nama Employee</Label>
          <Input id="name" name="name" placeholder="Masukkan Nama" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="gaji">Gaji</Label>
          <Input
            id="gaji"
            name="phoneNumber"
            placeholder="Masukkan No.Telp / WA"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="position">Posisi</Label>
          <Input
            id="position"
            name="position"
            placeholder="Masukkan Posisi Pekerjaan"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="contract-type">Jenis Kontrak</Label>
          <Input
            id="contract-type"
            name="contractType"
            placeholder="Masukkan Jenis Kontrak"
          />
        </div>
      </div>
    </FormModal>
  );
};

export default CreateEmployeeForm;
