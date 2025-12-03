import { supabaseClient } from "@/lib/supabase/client";
import { IApiGeneralResponseType } from "@/types/base_api.types";
import {
  IEmployeeResponseApiDataTypes,
  IEmployeeResponseDataTypes,
} from "@/types/employee.types";

class EmployeeServices {
  async getAll(): Promise<
    IApiGeneralResponseType<IEmployeeResponseDataTypes[]>
  > {
    try {
      const response = await supabaseClient.from("pegawai").select("*");

      const data: IEmployeeResponseApiDataTypes[] = response.data ?? [];

      const mappingData: IEmployeeResponseDataTypes[] = data?.map((item) => {
        return {
          nama: item.nama,
          gaji: item.gaji,
          posisi: item.jabatan_id,
          tanggal_masuk: item.tanggal_masuk,
        };
      });

      return {
        data: mappingData,
      };
    } catch (error) {
      throw error;
    }
  }
}

const employeeService = new EmployeeServices();

export default employeeService;
