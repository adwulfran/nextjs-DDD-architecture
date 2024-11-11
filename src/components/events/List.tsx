'use client';

import { useRouter } from "next/navigation";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from "@mui/material";
import { Event } from "@/domain/event";
import EventCard from "./Card";
import styles from "../styles.module.css";


interface Props {
    events: Partial<Event>[];
}


const EventsList: React.FC<Props> = ({ events }) => {
    const router = useRouter();
    
    return (
        <div className={styles.eventsListContainer}>
            <div className={styles.eventCards}>
                {events?.map((event, index) => (
                    <EventCard
                        key={index}
                        event={event}
                        goToDetail={() => router.push(`/events/${event.id}`)}
                    />

                ))}
            </div>
            <Button
                variant="outlined"
                onClick={() => router.push('/create-event')}
                sx={{ width: "150px" }}>
                <AddCircleOutlineIcon
                    fontSize="large"
                />
                &nbsp;Create
            </Button>
        </div>
    )
}

export default EventsList;