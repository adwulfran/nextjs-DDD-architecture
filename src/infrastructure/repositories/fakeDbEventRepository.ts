import { Event } from "@/domain/event";
import { IEventRepository } from "@/domain/eventRepository";
import { reformatDate } from "@/lib/reformatDate";
import fs from "fs";
import path from "path";
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export class FakeDbEventRepository implements IEventRepository {

    async create(event: Event) {
        const events = await this.readEvents();
        const newEvent: Event = {
            id: (events.length + 1).toString(),
            title: event.title,
            description: event.description,
            format: event.format,
            date: event.date,
            time: event.time,
            location: event.location,
            maxCapacity: event.maxCapacity,
        };
        events.push(newEvent);
        this.writeEvents(events);
        return newEvent;
    }
    async find(query: { [k: string]: string }) {
        await delay(2000);
        const events = await this.readEvents();

        const title = query.title?.toLowerCase();
        const format = query.format;
        const date = query.date;
        const radio = query.radio;

        let result = events.filter((event) =>
            event.title.toLowerCase().includes(title ? title : "")
            && (event.format ? event.format?.includes(format ? format : "") : true)
            && (event.date ? event.date.toString()?.includes(date ? date : "") : true)
        );

        switch (radio) {
            case 'previous':
                // result = result.filter((event) => new Date(reformatDate(`${event.date}`)) < new Date());
                result = result.filter((event) => new Date(reformatDate(`${event.date}`)) < new Date());
                break;
            case 'futur':
                result = result.filter((event) => new Date(reformatDate(`${event.date}`)) > new Date());
                break;
        }

        return result;
    }

    async findById(id: string) {
        const filePath = path.join(process.cwd(), 'data', 'events.json');
        const events: Event[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return events.find(event => event.id === id)
    }

    async findByIdAndUpdate(id: string, event: Event) {
        const events = await this.readEvents();
        const updatedEvents = events.map(_event => {
            if (_event.id === id) {
                return { ...event, id };
            }
            return _event;
        })
        await this.writeEvents(updatedEvents);
        return event;
    }

    async readEvents(): Promise<Event[]> {
        const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');
        const data = fs.readFileSync(eventsFilePath, 'utf-8');
        return JSON.parse(data);
    };

    // Utility function to write events to the JSON file
    async writeEvents(events: Event[]): Promise<void> {
        const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');
        fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2), 'utf-8');
    };

}