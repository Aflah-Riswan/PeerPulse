import z from "zod";

export const registerUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full Name must be includes atleast 2 letters")
    .max(100, "Full Name Must be at most 100 letters"),
  email: z.email("Invalid Email"),
  password: z
    .string()
    .min(6, "Password should be contains atleast 6")
    .max(64, "Password Must be at most 64 characters")
    .regex(/[A-Z]/, "Password should be include at least one Upper letter")
    .regex(/[a-z]/, "Password should be include at least one lower letter")
    .regex(/[0-9]/, "password hsould be include atleast  one digit")
});
