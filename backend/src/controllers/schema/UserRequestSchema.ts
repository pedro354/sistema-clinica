import { z } from "zod";

const EmailSchema = z
.string()
.trim()
.toLowerCase()
.email("Invalid email address")

const PasswordSchema = z
.string()
.min(8, "Password must be at least 8 characters long")

const NameSchema = z
.string()
.trim()
.min(3, "Name must be at least 3 characters long")

const UserSchema = z.object({
     name: NameSchema,
     email: EmailSchema,
     password: PasswordSchema,
})

export const CreateUserSchema = UserSchema

export const UpdateUserSchema = UserSchema.partial()