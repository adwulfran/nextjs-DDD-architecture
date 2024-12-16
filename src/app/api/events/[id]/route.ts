import { FakeDbEventRepository } from '@/infrastructure/repositories/fakeDbEventRepository';
import { EventUseCase } from '@/use-case/EventUseCase';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

const eventRepository = new FakeDbEventRepository();
const eventUseCase = new EventUseCase(eventRepository);


export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    try {
        const session = await getServerSession(authOptions);
        console.log(session)

        const body = await req.json();
        const event = await eventUseCase.findByIdAndUpdate(id as string, body);

        return NextResponse.json({ message: event }, { status: 200 });

        /*const event = req.body;
        const newEvent = await eventUseCase.create(event);
        res.status(201).json(newEvent);*/
    } catch (error) {
        console.warn(error);
    }
}
