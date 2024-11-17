import { NextApiRequest, NextApiResponse } from 'next';
import { FakeDbEventRepository } from '@/infrastructure/repositories/fakeDbEventRepository';
import { EventUseCase } from '@/use-case/EventUseCase';
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";

const eventRepository = new FakeDbEventRepository();
const eventUseCase = new EventUseCase(eventRepository);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      try {
        const session = await getServerSession(req, res, authOptions);
        console.log(session)
        const event = req.body;
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
