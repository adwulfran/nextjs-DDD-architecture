'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema, FormValues } from '../lib/validation/eventValidation';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { Button, Select, MenuItem, CardContent, Card } from '@mui/material';
import styles from './styles.module.css'
import TextInput from './TextInput';
import DateInput from './DateInput';
import { IEvent } from '@/models/Event';


interface EventFormProps {
    initialData?: IEvent;
    onSubmit: (data: FormValues) => void;
    readOnly?:boolean;
}


const EventForm: React.FC<EventFormProps> = ({ initialData, onSubmit, readOnly }) => {
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
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.eventForm} >
                    <fieldset disabled={readOnly} className="flex flex-col gap-4">
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

                        <TextInput control={control} name="location" />

                        <TextInput control={control} name="maxCapacity" />

                        { !readOnly ? <Button type="submit" variant="contained" color="primary">Submit</Button> : <></> }
                        </fieldset>
                    </form>
                </LocalizationProvider>
            </CardContent>
        </Card>
    );
};

export default EventForm;