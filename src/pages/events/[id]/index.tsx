"use client"

import { Event } from "@/domain/event";
import EventForm from "@/components/EventForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fetcher from "@/lib/fetcher";
import { FormValues } from "@/lib/validation/eventValidation";
import { CircularProgress } from "@mui/material";
import styles from "../../styles.module.css";

const EventDetailPage = () => {
    const router = useRouter();

    const [event, setEvent] = useState<Event>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = router.query;

    useEffect(() => {
        if (!id) return;
        fetcher<Event>(`/api/events/${id}`).then((result) => setEvent(result));
    }, [id]);

    async function handleSubmit(formData: FormValues) {
        const event = {
            ...formData,
            date: formData.date.toLocaleDateString()
        };

        try {
            setIsLoading(true);
            const res = await fetch(`/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });
            if (!res.ok) throw new Error('Failed to submit data');

        } catch (error) {
            console.warn(error);
        } finally {
            router.push('/');
        }
    }

    return (
        <div className={styles.eventPage}>
            {isLoading ?
                <CircularProgress />
                :
                <EventForm onSubmit={handleSubmit} initialData={event} />
            }
        </div>
    )
}


export default EventDetailPage;