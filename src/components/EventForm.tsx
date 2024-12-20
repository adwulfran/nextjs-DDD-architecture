'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema, FormValues } from '../lib/validation/eventValidation';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { Button, Select, MenuItem, CardContent, Card } from '@mui/material';
import styles from './styles.module.css'
import TextInput from './TextInput';
import DateInput from './DateInput';
import { IEvent } from '@/models/Event';


interface EventFormProps {
    initialData?: IEvent;
    onSubmit: (data: FormValues) => void;
}


const EventForm: React.FC<EventFormProps> = ({ initialData, onSubmit }) => {
    const { handleSubmit, control, formState } = useForm<FormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: initialData ?? {
            title: "",
            description: "",
            format: "hybrid",
            date: new Date(),
            time: new Date(),
            location: "",
            maxCapacity: 1,
        }
    });

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.eventForm}>
                        <TextInput control={control} name="title" />

                        <TextInput control={control} name="description" />

                        <Controller
                            name="format"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    displayEmpty
                                    error={!!formState.errors.format}
                                >
                                    <MenuItem value=""><em>Format</em> </MenuItem>
                                    <MenuItem value="physical">Physical</MenuItem>
                                    <MenuItem value="online">Online</MenuItem>
                                    <MenuItem value="hybrid">Hybrid</MenuItem>
                                </Select>
                            )}
                        />

                        <DateInput control={control} name="date" />

                        <DateInput control={control} name="time" />

                        <TextInput control={control} name="location" />

                        <TextInput control={control} name="maxCapacity" />

                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </form>
                </LocalizationProvider>
            </CardContent>
        </Card>
    );
};

export default EventForm;