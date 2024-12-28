"use client"

import EventForm from "@/components/EventForm";
import { useRouter } from "next/navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CircularProgress } from "@mui/material";
import { useFetch } from "@/hooks/useFetch";
import { IEvent } from "@/models/Event";


interface Prop {
    event: IEvent;
    readOnly: boolean;
}


const EventDetails: React.FC<Prop> = ({ event, readOnly }) => {
    const router = useRouter();
    const { isLoading, error, handleSubmit } = useFetch(`/api/events/${event._id}`, 'PUT');

    return (
        <div className="flex justify-center flex-col items-center gap-4">
            {isLoading ?
                <CircularProgress />
                :
                <>
                    <ArrowBackIcon
                        onClick={() => router.push('/')}
                        sx={{ cursor: "pointer" }}
                        fontSize="large"
                    />
                    <EventForm onSubmit={handleSubmit} initialData={event} readOnly={readOnly} />
                    <div>Creator of the event : { event.creator} </div>
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