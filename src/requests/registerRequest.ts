import { z } from "zod";

const registerRequest = z.object({
  name: z.string().min(1, "Nama harus diisi."),
  email: z.string().email("Email tidak valid."),
  password: z.string().min(6, "Password harus memiliki minimal 6 karakter."),
});

type RegisterForm = z.infer<typeof registerRequest>;

export { registerRequest, type RegisterForm };
