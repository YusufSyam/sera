import { useForm } from "@tanstack/react-form";
import { ReactNode } from "react";
import { employeeSchema } from "../schema";

export const useCreateEmployeeForm = (onSubmit: ReactNode) => {
  return useForm({
    validators: {
      onSubmit: employeeSchema,
    },
    onSubmit: () => onSubmit,
  });
};
