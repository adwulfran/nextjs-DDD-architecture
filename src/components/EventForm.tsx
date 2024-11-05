'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema, FormValues } from '../validation/eventValidation';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { IEvent } from '@/models/eventSchema';
import styles from './styles.module.css'


interface EventFormProps {
    initialData?: IEvent;
    onSubmit: (data: FormValues) => void;
}

const EventForm: React.FC<EventFormProps> = ({ initialData, onSubmit }) => {

    const { control, handleSubmit, formState } = useForm<FormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: initialData ? initialData : {
            title: "",
            description: "",
            format: "",
            date: new Date(),
            time: new Date(),
            location: "",
            maxCapacity: 1,
        }
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.eventForm}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Title"
                            variant="outlined"
                            margin="normal"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
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
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            multiline rows={4}
                        />
                    )}
                />

                <Controller
                    name="format"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            displayEmpty
                            error={!!formState.errors.format}
                        >
                            <MenuItem value=""><em>Format</em>
                            </MenuItem>
                            <MenuItem value="physical">Physical</MenuItem>
                            <MenuItem value="online">Online</MenuItem>
                            <MenuItem value="hybrid">Hybrid</MenuItem>
                        </Select>
                    )}
                />
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            label="Date"
                            onChange={(date) => field.onChange(date)}
                            value={field.value}
                            slotProps={{
                                textField: {
                                    error: !!formState.errors.date,
                                    helperText: formState.errors.date?.message,
                                },

                            }}
                        />
                    )}
                />
                <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                        <TimePicker
                            {...field}
                            label="Time"
                            onChange={(time) => field.onChange(time)}
                            value={field.value}
                        />
                    )}
                />
                <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Location"
                            variant="outlined"
                            margin="normal"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            error={!!formState.errors.location}
                            helperText={formState.errors.location?.message}
                        />
                    )}
                />
                <Controller
                    name="maxCapacity"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Capacity"
                            type="number"
                            variant="outlined"
                        />
                    )}
                />
                
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </LocalizationProvider>
    );
};

export default EventForm;