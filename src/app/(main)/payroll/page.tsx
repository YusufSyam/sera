import FormModal from "@/components/shared/FormModal/FormModal";
import HeaderWithButton from "@/components/shared/HeaderWithButton/HeaderWithButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconReceipt2, IconUsersGroup } from "@tabler/icons-react";

const PayrollPage = () => {
  return (
    <section className="px-5">
      <HeaderWithButton
        title="Payroll"
        description="Kelola Payroll Pegawai anda"
        icon={IconReceipt2}
      >
        <FormModal
          btnText="+ Tambah Payroll"
          title="Payroll"
          description="Silahkan Input data payroll anda"
          icon={IconReceipt2}
        >
          <div className="grid grid-cols-2 gap-5">
            <div className="grid gap-3">
              <Label htmlFor="name">Nama Employee</Label>
              <Input id="name" name="name" placeholder="Masukkan Nama" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone-number">Gaji</Label>
              <Input
                type="number"
                id="payroll"
                name="payroll"
                placeholder="Masukkan Gaji"
              />
            </div>
          </div>
        </FormModal>
      </HeaderWithButton>
    </section>
  );
};

export default PayrollPage;
