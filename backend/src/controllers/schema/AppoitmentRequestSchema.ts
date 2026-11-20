import z from "zod"

const queryIdSchema = z.coerce
.number()
.int()
.positive("ID must be a positive integer")

export const CreateAppointmentRequestSchema = z.object({
    userId: queryIdSchema,
    patientId: queryIdSchema,
    date: z.coerce
  .date()
  .refine(
    (date) => date.getTime() > Date.now(),
    {
      message: "Date must be in the future"
    }
  ),
    description: z.string().trim().min(5, "Description must be at least 5 characters long").optional(),
    status: z.enum(["SCHEDULED", "COMPLETED", "CANCELED"]).optional()
})

export const UpdateAppointmentRequestSchema = CreateAppointmentRequestSchema.partial()

export const GetAppointmentsRequestSchema = z.object({
    userId: queryIdSchema.optional(),
    patientId: queryIdSchema.optional(),
    sortBy: z.enum(["date", "status"]).optional(),
    order: z.enum(["asc", "desc"]).optional(),
    offset: z.coerce.number().int("Offset must be a non-negative integer").nonnegative().optional(),
    limit: z.coerce.number().int("Limit must be a positive integer").positive().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    status: z.enum(["SCHEDULED", "COMPLETED", "CANCELED"]).optional()
})