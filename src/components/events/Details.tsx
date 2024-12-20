"use client"

import EventForm from "@/components/EventForm";
import { useRouter } from "next/navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CircularProgress } from "@mui/material";
import { useFetch } from "@/hooks/useFetch";
import { IEvent } from "@/models/Event";


interface Prop {
    event: IEvent;
}


const EventDetails: React.FC<Prop> = ({ event }) => {
    const router = useRouter();
    const { isLoading, error, handleSubmit } = useFetch(`/api/events/${event._id}`, 'PUT');

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {isLoading ?
                <CircularProgress />
                :
                <>
                    <ArrowBackIcon
                        onClick={() => router.push('/')}
                        sx={{ cursor: "pointer" }}
                        fontSize="large"
                    />
                    <EventForm onSubmit={handleSubmit} initialData={event} />
                </>
            }

            {error ?
                (<> Something went wrong</>)
                :
                (<></>)
            }
        </div>
    )
}

export default EventDetails;