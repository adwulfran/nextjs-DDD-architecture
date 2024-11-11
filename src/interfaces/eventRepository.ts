import { Event } from "@/domain/event";

export interface IEventRepository {
    create(event: Event): Promise<Event>;
    find(query: { [k: string]: string }): Promise<Event[]>;
    findById(id: string): Promise<Event | undefined>;
    findByIdAndUpdate(id: string, event: Event): Promise<Event>;
}