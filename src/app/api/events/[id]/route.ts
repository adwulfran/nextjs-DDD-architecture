import { NextRequest, NextResponse } from 'next/server';
import Event from '@/models/Event';
import { connectToDatabase } from '@/lib/mongodb';

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const body = await req.json();

    await connectToDatabase();

    try {
        const event = await Event.findByIdAndUpdate(id, body)
        return NextResponse.json({ message: event }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
}

