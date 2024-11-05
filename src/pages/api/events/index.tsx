import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { IEvent } from '@/models/eventSchema';

const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');

// Utility function to read events from the JSON file
const readEvents = (): IEvent[] => {
  const data = fs.readFileSync(eventsFilePath, 'utf-8');
  return JSON.parse(data);
};

// Utility function to write events to the JSON file
const writeEvents = (events: IEvent[]): void => {
  fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2), 'utf-8');
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      // Create event
      const events = readEvents();
      const newEvent: IEvent = {
        id: (events.length + 1).toString(),
        title: req.body.title,
        description: req.body.description,
        format: req.body.format,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        maxCapacity: req.body.maxCapacity,
      };
      events.push(newEvent);
      writeEvents(events);
      res.status(201).json(newEvent);
      break;

    case 'GET':
      // Get all events
      const allEvents = readEvents();
      res.status(200).json(allEvents);
      break;

    default:
      res.status(405).end(); // Method Not Allowed
  }
}
