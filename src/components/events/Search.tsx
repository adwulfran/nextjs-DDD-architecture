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
    eventDate: z.date(),
    format: z.string()

});

export type FormSearchValues = z.infer<typeof searchSchema>

export default function EventsSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const { control, handleSubmit, formState } = useForm<FormSearchValues>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            title: "",
            eventDate: new Date(),
            format: ""
        }
    });

    /*function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
          params.set('title', term);
        } else {
          params.delete('title');
        }
        replace(`${pathname}?${params.toString()}`);
      }*/

    function onSubmit(data: FormSearchValues) {
        const params = new URLSearchParams(searchParams);
        console.log(data.title);
        for (const [key, value] of Object.entries(data)) {
            if (key) {
                params.set(key, value.toString());
            } else {
                params.delete(key);
            }
        }
        /*  if (data.title) {
            params.set('title', data.title);
          } else {
            params.delete('title');
          }*/
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                placeholder="Search by title"
                            />
                        )}
                    />
                    <Controller
                        name="eventDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                label="Event Date"
                                onChange={(date) => field.onChange(date)}
                                value={field.value}
                                slotProps={{
                                    textField: {
                                        error: !!formState.errors.eventDate,
                                        helperText: formState.errors.eventDate?.message,
                                    }
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="format"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} labelId="select-label" defaultValue="" >
                                <MenuItem value="">
                                    <em>None</em>
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

            {/* <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />*/}
        </div>
    );
}