import { z } from 'zod';

export const eventSchema = z.object({

    title: z.string().min(1, { message: "Title is required" }),

    description: z.string().optional(),

    eventDate: z.date()
        .refine((date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to the start of the day
            return date >= today;
        }, { message: "Must be future date" }),

    maxCapacity: z.number().positive("Max capacity must be positive"),

    participants: z.array(z.string()).optional(),
});

export type FormValues = z.infer<typeof eventSchema>;