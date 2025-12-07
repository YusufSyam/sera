import { supabaseClient } from "@/lib/supabase/client";
import { IApiSupabaseGeneralResponseType } from "@/types/base_api.types";
import {
  IEmployeeResponseDataTypes,
  IInsertEmployeRequestApiDataTypes
} from "@/types/employee.types";

class EmployeeServices {
  async getAll(): Promise<
    IApiSupabaseGeneralResponseType<IEmployeeResponseDataTypes[]>
  > {
    try {
      const { data, status, error } = await supabaseClient.from("pegawai")
        .select(`id, 
                 nama, 
                 gaji,  
                 tanggal_masuk,
                 jabatan:jabatan_id!inner (id, nama_jabatan)`);

      const mappingData: IEmployeeResponseDataTypes[] = (data ?? []).map(
        (item) => {
          return {
            id: item.id,
            nama: item.nama,
            gaji: item.gaji,
            posisi: (item as any).jabatan.nama_jabatan,
            tanggal_masuk: item.tanggal_masuk,
            jabatan_id: (item as any).jabatan.id
          };
        }
      );

      return {
        data: mappingData,
        status,
        error,
      };
    } catch (error) {
      throw error;
    }
  }
  

  async createEmployee(payload: IInsertEmployeRequestApiDataTypes[]) {
    try {
      const { data, status, error } = await supabaseClient
        .from("pegawai")
        .insert(payload);

      if (error) {
        return { error: error.message };
      }

      return {
        status,
        success: true,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}

const employeeService = new EmployeeServices();

export default employeeService;
