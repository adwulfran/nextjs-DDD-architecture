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

export const searchSchema = z.object({
    title: z.string(),
    date: z.date().nullish(),
    format: z.string()
});

export type FormSearchValues = z.infer<typeof searchSchema>;

const EventsSearch: React.FC = () => {
    const searchParams = useSearchParams();

    const pathname = usePathname();
    
    const urlSearchParams = new URLSearchParams(searchParams!);

    const { control, handleSubmit } = useForm<FormSearchValues>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            title: urlSearchParams.get('title') ?? "",
            date: urlSearchParams.get('date') ? new Date(urlSearchParams.get('date')!) : null,
            format: urlSearchParams.get('format') ?? ""
        }
    });

    function onSubmit(formData: FormSearchValues) {
        const params = new URLSearchParams(searchParams!);

        params.delete('title');
        params.delete('date');
        params.delete('format');
        params.delete('page');
        params.delete('radio');

        for (const [key, value] of Object.entries(formData)) {
            if (value && value !== "") {
                params.set(key, value as string);
            }
        }
        window.location.href = `${pathname}?${params.toString()}`;
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