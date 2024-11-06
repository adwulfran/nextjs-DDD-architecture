import { IEvent } from "@/models/eventSchema";
import fs from "fs";
import path from "path";


// Utility function to read events from the JSON file
export function readEvents(): IEvent[] {
    const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');
    const data = fs.readFileSync(eventsFilePath, 'utf-8');
    return JSON.parse(data);
};

// Utility function to write events to the JSON file
export function writeEvents(events: IEvent[]): void {
    const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');
    fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2), 'utf-8');
};

export function create(event: IEvent) {
    const events = readEvents();
    const newEvent: IEvent = {
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
    writeEvents(events);
    return newEvent;
}

export function find(query: { title?: string, format?: string, date?: Date }) {
    const events = readEvents(); 

    const title = query?.title as string | undefined;
    const format = query?.format as string | undefined;
    const date = query?.date as string | undefined

    const result = events.filter((e) =>
        e.title.includes(title ? title : "")
        && (e.format ? e.format?.includes(format ? format : "") : true)
        && (e.date ? e.date.toString()?.includes(date ? date : "") : true)
    );
    return result
    /* 
   
    POUR PAGINATION :
    const limit = 5;
    if (query.page) {
        return result.slice(
            query.page*limit,
            query.page*limit + limit
        )
    }
     */ 
}

export function findById(id: string) {
    const filePath = path.join(process.cwd(), 'data', 'events.json');
    const events: IEvent[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return events.find(event => event.id === id)
}

export function findByIdAndUpdate(id: string,event:IEvent) {
    const events = readEvents();
    const updatedEvents =  events.map(_event => {
        if (_event.id === id) {
            return {...event, id};
        }
        return _event;
    })
    writeEvents(updatedEvents);
    return event;
}
