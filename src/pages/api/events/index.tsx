import { NextApiRequest, NextApiResponse } from 'next';
import { FakeDbEventRepository } from '@/infrastructure/repositories/fakeDbEventRepository';
import { EventUseCase } from '@/use-case/EventUseCase';

const eventRepository = new FakeDbEventRepository();
const eventUseCase = new EventUseCase(eventRepository);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      // Create event
      const event = req.body;
      try {
        const newEvent = await eventUseCase.create(event);
        res.status(201).json(newEvent);
      } catch (error) {
        console.warn(error);
      }
      break;
    default:
      res.status(405).end(); // Method Not Allowed
  }
}
