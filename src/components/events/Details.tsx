import { Event } from "@/domain/event";
import EventForm from "@/components/EventForm";
import { useRouter } from "next/router";
import {  useState } from "react";
import { FormValues } from "@/lib/validation/eventValidation";
import { CircularProgress } from "@mui/material";


interface Prop {
    event: Event;
}


const EventDetails: React.FC<Prop> = ({ event }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleSubmit(formData: FormValues) {
        const data = {
            ...formData,
            date: formData.date.toLocaleDateString()
        };

        try {
            setIsLoading(true);
            const res = await fetch(`/api/events/${event.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to submit data');

        } catch (error) {
            console.warn(error);
        } finally {
            router.push('/');
        }
    }


    return (
        <div style={{display: "flex", justifyContent:"center"}}>
            {isLoading ?
                <CircularProgress />
                :
                <EventForm onSubmit={handleSubmit} initialData={event} />
            }
        </div>
    )
}

export default EventDetails;