import z from "zod"

const idSchema = z.number().int().positive("ID must be a positive integer")

export const CreateAppointmentRequestSchema = z.object({
    userId: idSchema,
    patientId: idSchema,
    date: z.coerce.date().refine((date) => date > new Date(), { message: "Date must be in the future"}),
    description: z.string().trim().min(5, "Description must be at least 5 characters long").optional()
})

export const UpdateAppointmentRequestSchema = CreateAppointmentRequestSchema.partial()

export const GetAppointmentsRequestSchema = z.object({
    userId: idSchema.optional(),
    patientId: idSchema.optional(),
    sortBy: z.enum(["date", "status"]).optional(),
    order: z.enum(["asc", "desc"]).optional(),
    offset: z.coerce.number().int("Offset must be a non-negative integer").nonnegative().optional(),
    limit: z.coerce.number().int("Limit must be a positive integer").positive().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    status: z.enum(["SCHEDULED", "COMPLETED", "CANCELED"]).optional()
})