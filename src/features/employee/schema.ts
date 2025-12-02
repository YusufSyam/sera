import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(2, {
    message: "Name minimial harus 2 huruf",
  }),
});
