'use client';

import { usePathname, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, MenuItem, Select } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import SearchIcon from '@mui/icons-material/Search';
import TextInput from "../TextInput";
import DateInput from "../DateInput";
import { reformatDate } from "@/lib/reformatDate";

export const searchSchema = z.object({
    title: z.string(),
    date: z.date().nullish(),
    format: z.string()
});

export type FormSearchValues = z.infer<typeof searchSchema>;

const EventsSearch: React.FC = () => {
    const searchParams = useSearchParams();

    const pathname = usePathname();
;
    const urlSearchParams = new URLSearchParams(searchParams!);

    const { control, handleSubmit } = useForm<FormSearchValues>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            title: urlSearchParams.get('title') ?? "",
            date: urlSearchParams.get('date') ? new Date(reformatDate(urlSearchParams.get('date')!)) : null,
            format: ""
        }
    });

    function onSubmit(formData: FormSearchValues) {
        const params = new URLSearchParams(searchParams!);
        for (const [key, value] of Object.entries(formData)) {
            if (key && value !== null) {
                params.set(key, key !== "date"  ? value.toString() : (value as Date).toLocaleDateString());
            } else {
                params.delete(key);
            }
        }
        params.delete('page');
        params.delete('radio');
        window.location.href = `${pathname}?${params.toString()}`
        //reload(`${pathname}?${params.toString()}`);
        // refresh()
    }

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput control={control} name="title" />
                    <DateInput control={control} name="date" />
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
                    <Button type="submit" data-testid="search" >
                        <SearchIcon fontSize="large" />
                    </Button>
                </form>
            </LocalizationProvider>
        </div>
    );
}

export default EventsSearch;