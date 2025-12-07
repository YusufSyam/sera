"use client";

import HeaderWithButton from "@/components/shared/HeaderWithButton/HeaderWithButton";
import CreateEmployeeForm from "@/features/employee/components/CreateEmployeeForm";
import EmployeeTable from "@/features/employee/components/EmployeeTable";
import { IconUsersGroup } from "@tabler/icons-react";

const EmployeePage = () => {
  return (
    <section className="px-5 md:px-20">
      <HeaderWithButton
        title="Employee"
        description="Kelola Pegawai anda"
        icon={IconUsersGroup}
      >
        <CreateEmployeeForm />
      </HeaderWithButton>

      <EmployeeTable />
    </section>
  );
};

export default EmployeePage;
