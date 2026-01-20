import * as z from "zod";
import { UserStatus, UserCategory, UserType } from "@/enums/index.enum";

export const userSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(8, "Phone must have at least 8 digits"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Country is required"),
  status: z.enum(Object.values(UserStatus) as [string, ...string[]]),
  category: z.enum(Object.values(UserCategory) as [string, ...string[]]),
  type: z.enum(Object.values(UserType) as [string, ...string[]]),
});

export type UserFormData = z.infer<typeof userSchema>;