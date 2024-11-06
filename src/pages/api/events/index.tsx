import { NextApiRequest, NextApiResponse } from 'next';
import { create, readEvents } from '../../../../db';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      // Create event
      const event = req.body;
      try {
      const newEvent = create(event);
      res.status(201).json(newEvent);
      } catch(error) {
        console.warn(error);
      }
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
