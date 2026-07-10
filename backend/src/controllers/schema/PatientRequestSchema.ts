import z from "zod";

const PhoneSchema = z
.string()
.regex(/^\(\d{2}\) 9\d{4}-\d{4}$/, "Invalid Phone, please type (00) 99999-9999")
.transform((value) => value.replace(/\D/g, ""));

export const CreatePatientRequestSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    phone: PhoneSchema,
    userId: z.number().int().positive("User ID must be a positive integer")
})

export const updatePatientRequestSchema = CreatePatientRequestSchema.partial()

export const getPatientsRequestSchema = z.object({
    name: z.string().optional(),
    sortBy: z.enum(["name", "phone", "createdAt"]).optional(),
    order: z.enum(["asc", "desc"]).optional(),
    offset: z.number().int("Offset must be a non-negative integer").optional(),
    limit: z.number().int("Limit must be a positive integer").optional(),
})



