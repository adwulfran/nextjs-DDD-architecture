import { Event } from "@/domain/event";
import { IEventRepository } from "@/interfaces/eventRepository";

export class EventUseCase {
    constructor(private eventRepository: IEventRepository) { }

    async create(event: Event): Promise<Event> {
        return this.eventRepository.create(event);
    }

    async find(query: { [k: string]: string }): Promise<Event[]> {
        return this.eventRepository.find(query);
    }

    async findById(id: string): Promise<Event | undefined> {
        return this.eventRepository.findById(id);
    }

    async findByIdAndUpdate(id: string, event: Event): Promise<Event> {
        return this.eventRepository.findByIdAndUpdate(id, event);
    }
}