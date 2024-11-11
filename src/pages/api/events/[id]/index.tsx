import { NextApiRequest, NextApiResponse } from 'next';
import { FakeDbEventRepository } from '@/infrastructure/repositories/fakeDbEventRepository';
import { EventUseCase } from '@/use-case/EventUseCase';

const eventRepository = new FakeDbEventRepository();
const eventUseCase = new EventUseCase(eventRepository);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    switch (req.method) {
        case 'GET':
            try {
                const event = await eventUseCase.findById(id as string);
                res.status(200).json(event);
            } catch (error) {
                console.warn(error);
            }
            break;

        case 'PUT':
            try {
                const event = await eventUseCase.findByIdAndUpdate(id as string, req.body);
                res.status(200).json(event);
            } catch (error) {
                console.warn(error);
            }
        default:
            res.status(405).end(); // Method Not Allowed
    }
}
