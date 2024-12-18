import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import Event from '@/models/Event';

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const creator = session?.user?.name;
    const body = await request.json();

    await connectToDatabase();

    try {
        const newEvent = await Event.create({ ...body, creator });
        return NextResponse.json({ message: newEvent }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}
