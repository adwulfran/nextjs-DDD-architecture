import Event, { IEvent } from "@/models/Event";
import { connectToDatabase } from "./mongodb";
import { ISearchQuery } from "@/app/page";

export async function fetchEvents(
    query: Omit<ISearchQuery, 'title'> & { title?: { $regex: string; $options: string } },
    page?: string
): Promise<{ eventsPaginated: IEvent[], numberOfEvents: number }> {

    await connectToDatabase();
    let events: IEvent[] = [];

    try {
        events = await Event.find(query);
        const limit = 5;
        const eventsPaginated = events?.slice(
            page ? (Number(page) - 1) * limit : 0,
            page ? (Number(page) - 1) * limit + limit : limit,
        );

        return {
            eventsPaginated,
            numberOfEvents: events.length
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch events');
    }
}