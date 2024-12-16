import { Event } from "./event";

export interface IEventRepository {
    create(event: Omit<Event, "id">): Promise<Event>;
    find(query: { [k: string]: string }): Promise<Event[]>;
    findById(id: string): Promise<Event | undefined>;
    findByIdAndUpdate(id: string, event: Event): Promise<Event>;
}