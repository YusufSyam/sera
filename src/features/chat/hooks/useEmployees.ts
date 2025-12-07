import employeeServices from "@/services/Employee/employee.services";
import { useQuery } from "@tanstack/react-query";


export const useGetAllEmployees = () => {
  return useQuery({
    queryKey: ["employee-lists"],
    queryFn: async () => {
      const response = await employeeServices.getAll();

      return response.data;
    }
  });
};

