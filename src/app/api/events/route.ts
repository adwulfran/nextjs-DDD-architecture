import { FakeDbEventRepository } from '@/infrastructure/repositories/fakeDbEventRepository';
import { EventUseCase } from '@/use-case/EventUseCase';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';


const eventRepository = new FakeDbEventRepository();
const eventUseCase = new EventUseCase(eventRepository);


export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        console.log(session)

        const body = await request.json();
        const newEvent = await eventUseCase.create(body);
        return NextResponse.json({ message: newEvent }, { status: 201 });

        /*const event = req.body;
        const newEvent = await eventUseCase.create(event);
        res.status(201).json(newEvent);*/
    } catch (error) {
        console.warn(error);
    }
}
