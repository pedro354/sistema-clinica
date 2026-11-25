import z from "zod"

export const CreateScheduleAvailabilityRequestSchema = z.object({
    startDate: z.coerce.date().refine(
        (date) => date > new Date(),
        { message: "Start date must be in the future" }
    ),
    endDate: z.coerce.date().refine(
        (date) => date > new Date(),
        { message: "End date must be in the future" }
    ),
    isAvailable: z.boolean()
});
export const UpdateScheduleAvailabilityRequestSchema = CreateScheduleAvailabilityRequestSchema.partial()

export const GetScheduleAvailabilityRequestSchema = z.object({
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
    isAvailable: z.coerce.boolean().optional()
})