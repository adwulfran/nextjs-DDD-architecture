import mongoose, {  Schema } from 'mongoose';

export interface IEvent {
    _id:string;
    title: string;
    format: 'physical' | 'online' | 'hybrid';
    date: Date;
    time: Date;
    location: string;
    maxCapacity: number;
    description: string;
    creator: string;
    participants?: string[];
}

const eventSchema = new Schema<IEvent>({
    title: { type: String, required: true },
    format: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: Date },
    location: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
    description: { type: String, },
    creator: { type: String, required: true },
    participants: [{ type: String }]
});

const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;
