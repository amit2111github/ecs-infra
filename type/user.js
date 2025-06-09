import { email, z } from "zod/v4";

export const createUserSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 characters long"),
  password: z
    .string()
    .min(4, "Password is too small, should be at least 4 characters"),
  email: z.string().email("Invalid Email"),
});

export const userSignInObject = z.object({
  password: z
    .string()
    .min(4, "Password is too small, should be at least 4 characters"),
  email: z.string().email("Invalid Email"),
});
