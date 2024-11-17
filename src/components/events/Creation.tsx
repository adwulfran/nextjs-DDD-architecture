'use client'

import { useRouter } from 'next/navigation';
import EventForm from "@/components/EventForm";
import { FormValues } from '@/lib/validation/eventValidation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

interface IApiError {
    message: string;
}

export default function EventsCreation() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<IApiError | null>(null); // Typing the error

   // const [data, loading, error, handleFetch, success] = useFetch()
    async function handleSubmit(formData: FormValues) {
        const event = {
            ...formData,
            date: formData.date.toLocaleDateString()
        };
        //handleFetch('/api/events', 'post', body)
        try {
            setIsLoading(true);
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Failed to submit data');

        } catch (err) {
            setError({ message: err as string });

        } finally {
            router.push('/');
        }
    }

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