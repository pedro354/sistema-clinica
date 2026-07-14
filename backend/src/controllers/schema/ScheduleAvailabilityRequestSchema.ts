import z from "zod"

const idSchema = z.number().int().positive("ID must be a positive integer")


export const CreateScheduleAvailabilityRequestSchema = z.object({
    userId: idSchema,
    startDate: z.coerce.date().refine((date) => date > new Date(), { message: "Start date must be in the future"}),
    endDate: z.coerce.date().refine((date) => date > new Date(), { message: "End date must be in the future"}),
    isAvailable: z.boolean()
})

export const UpdateScheduleAvailabilityRequestSchema = CreateScheduleAvailabilityRequestSchema.partial()

export const GetScheduleAvailabilityRequestSchema = z.object({
    userId: idSchema.optional(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
    isAvailable: z.boolean().optional()
})