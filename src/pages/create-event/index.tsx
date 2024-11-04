'use client'

import { useRouter } from 'next/navigation';
import EventForm from "@/components/EventForm";


export default function CreateEventPage() {
    const router = useRouter();

    function handleSubmit() {
        // setLoader(true)
        // fetch post attendre la réponse avant de router push
        router.push('/');
    }

    return (<EventForm onSubmit={handleSubmit} />)
}