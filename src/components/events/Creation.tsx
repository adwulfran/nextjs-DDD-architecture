'use client'

import { useRouter } from 'next/navigation';
import EventForm from "@/components/EventForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CircularProgress } from '@mui/material';
import { useFetch } from '@/hooks/useFetch';



export default function EventsCreation() {
    const router = useRouter();
    const { isLoading, error, handleSubmit } = useFetch('POST');

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {isLoading ?
                (<CircularProgress />)
                :
                (<>
                    <ArrowBackIcon
                        onClick={() => router.push('/')}
                        sx={{ cursor: "pointer" }}
                        fontSize="large"
                    />
                    <EventForm onSubmit={handleSubmit} />
                </>)
            }

            {error ?
                (<> Something went wrong</>)
                :
                (<></>)
            }
        </div>
    )
}