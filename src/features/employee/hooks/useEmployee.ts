"use client";

import { GET_ALL_EMPLOYEE_QUERY_KEY } from "@/constant/query_key";
import employeeService from "@/services/Employee/employee.services";
import { useQuery } from "@tanstack/react-query";

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
