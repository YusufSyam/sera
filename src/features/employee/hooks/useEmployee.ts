"use client";

import { GET_ALL_EMPLOYEE_QUERY_KEY, GET_ALL_JABATAN_QUERY_KEY } from "@/constant/query_key";
import employeeService from "@/services/Employee/employee.services";
import { IInsertEmployeRequestApiDataTypes } from "@/types/employee.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllEmployes = () => {
  return useQuery({
    queryKey: [GET_ALL_EMPLOYEE_QUERY_KEY],
    queryFn: async () => {
      const response = await employeeService.getAll();
      const data = response.data;

      return data;
    },
  });
};

export const useGetAllJobs = () => {
  return useQuery({
    queryKey: [GET_ALL_JABATAN_QUERY_KEY],
    queryFn: async () => {
      const response = await employeeService.getAllJobs();
      const data = response.data;

      return data;
    },
  });
};

export const useInsertEmployee = () => {
  return useMutation({
    mutationFn: (payload: IInsertEmployeRequestApiDataTypes[]) => {
      return employeeService.createEmployee(payload);
    },
  });
};

export const useUpdateEmployee = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<IInsertEmployeRequestApiDataTypes> }) => {
      return employeeService.updateEmployee(id, payload);
    },
  });
};

export const useDeleteEmployee = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return employeeService.deleteEmployee(id);
    },
  });
};