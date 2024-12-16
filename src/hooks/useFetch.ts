import { useState } from "react";
import { FormValues } from '@/lib/validation/eventValidation';
import { useRouter } from "next/navigation";


export function useFetch(url:string, method: string) {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | unknown>(null);

    async function handleSubmit(formData: FormValues) {
        const event = {
            ...formData,
            date: formData.date.toLocaleDateString()
        };

        try {
            setIsLoading(true);
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to submit data');

            router.push('/');

        } catch (err) {
            setError(err);
        }
    }

    return {
        isLoading,
        error,
        handleSubmit
    }
}