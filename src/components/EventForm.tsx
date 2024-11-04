'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema, FormValues } from '../validation/eventValidation';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { EventFormData } from '@/models/eventSchema';


interface EventFormProps {
    initialData?: EventFormData;
    onSubmit: (data: FormValues) => void;
}


const EventForm: React.FC<EventFormProps> = ({ initialData, onSubmit }) => {

    const {  control, handleSubmit, formState } = useForm<FormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: initialData ? initialData : {
            title: "",
            description: "",
            eventDate: new Date(),
            maxCapacity: 1,
            participants: [""]
        }
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="title"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!formState.errors.title}
                            helperText={formState.errors.title?.message}
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Description"
                            variant="outlined"
                            fullWidth margin="normal"
                            multiline rows={4}
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
                                },
                                
                            }}
                        />
                    )}
                />
                <Controller
                    name="maxCapacity"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Max Capacity"
                            type="number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    )}
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </LocalizationProvider>
    );
};

export default EventForm;