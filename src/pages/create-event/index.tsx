'use client'

import { useRouter } from 'next/navigation';
import EventForm from "@/components/EventForm";
import { FormValues } from '@/validation/eventValidation';


export default function CreateEventPage() {
    const router = useRouter();

    async function handleSubmit(data: FormValues) {
        // setLoader(true)
        // fetch post attendre la réponse avant de router push
        const _data = {
            ...data,
            date: data.date.toLocaleDateString()
        };
        
        const res = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(_data),
        });

        const result = await res.json();
        console.log('retour result ? ', result)
        router.push('/');
    }

    return (<EventForm onSubmit={handleSubmit} />)
}