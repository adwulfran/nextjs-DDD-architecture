'use client'

import { useRouter } from 'next/navigation';
import EventForm from "@/components/EventForm";
import { FormValues } from '@/validation/eventValidation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';


interface IApiError {
    message: string;
}

export default function CreateEventPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<IApiError | null>(null); // Typing the error

    async function handleSubmit(data: FormValues) {
        const _data = {
            ...data,
            date: data.date.toLocaleDateString()
        };

        try {
            setIsLoading(true);
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(_data),
            });
            if (!res.ok) throw new Error('Failed to submit data');

        } catch (err) {
            setError({ message: err as string });

        } finally {
            router.push('/');
        }
    }

    return (
        <>
            {isLoading ?
                (<> loading ... </>)
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
        </>
    )
}