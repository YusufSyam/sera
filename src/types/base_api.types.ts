import { PostgrestError } from "@supabase/supabase-js";

export interface IApiSupabaseGeneralResponseType<T> {
  status: number;
  error: PostgrestError | null;
  data?: T;
}

export interface ISessionRequestType {
  session_id: string;
}
