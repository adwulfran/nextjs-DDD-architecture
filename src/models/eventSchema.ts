export interface IEvent {
    id: string;
    title: string;
    description?: string;
    format: 'in-person' | 'online' | 'hybrid';
    date: Date; 
    time: Date;
    location: string;
    maxCapacity: number;
}