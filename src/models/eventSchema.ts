export interface EventFormData {
    id: string;
    title: string;
    description: string;
    format: 'in-person' | 'online' | 'hybrid';
    eventDate: Date; // ISO date string
    time: string; // Time string (HH:mm)
    location: {
        address?: string;
        link?: string;
    };
    maxCapacity: number;
    participants?: string[]; // Array of participant names or IDs
}