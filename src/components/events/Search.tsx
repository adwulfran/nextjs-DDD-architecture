'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'


export const searchSchema = z.object({
    title: z.string(),
    date: z.date(),
    format: z.string()
});

export type FormSearchValues = z.infer<typeof searchSchema>

export default function EventsSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const { control, handleSubmit } = useForm<FormSearchValues>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            title: "",
            date: new Date(),
            format: ""
        }
    });

    function onSubmit(data: FormSearchValues) {
        const params = new URLSearchParams(searchParams);
        for (const [key, value] of Object.entries(data)) {
            console.log('key ? ',key)
            if (key) {
                params.set(key, key !== "date" ? value.toString() : (value as Date).toLocaleDateString());
            } else {
                params.delete(key);
            }
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                placeholder="Search by title"
                            />
                        )}
                    />
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                label="Event Date"
                                onChange={(date) => field.onChange(date)}
                                value={field.value}
                            />
                        )}
                    />
                    <Controller
                        name="format"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} displayEmpty >
                                <MenuItem value="">
                                    None
                                </MenuItem>
                                <MenuItem value="physical">Physical</MenuItem>
                                <MenuItem value="online">Online</MenuItem>
                                <MenuItem value="hybrid">Hybrid</MenuItem>
                            </Select>
                        )}
                    />
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </form>
            </LocalizationProvider>
        </div>
    );
}