import { z } from 'zod';

const removeTime = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0); // Sets hours, minutes, seconds, and milliseconds to zero
    return newDate;
  };
  
export const eventSchema = z.object({

    title: z.string().min(1, { message: "Title is required" }),

    description: z.string().optional(),

    date: z.date()
        .refine((date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to the start of the day
            return date >= today;
        }, { message: "Must be future date" }).transform(removeTime),

    time: z.date(),

    format: z.string(),

    location : z.string(), 

    maxCapacity: z.number().positive("Max capacity must be positive"),

   
});

export type FormValues = z.infer<typeof eventSchema>;