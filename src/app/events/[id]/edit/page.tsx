import EventDetails from "@/components/events/Details";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import { notFound } from "next/navigation";

export default async function Page(
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const id = params.id;

    await connectToDatabase();

    const data = await Event.findById(id);
    const event = JSON.parse(JSON.stringify(data));

    if (!event) {
        notFound();
    }

    return (
        <EventDetails
            event={{
                ...event,
                date: new Date(event.date),
                time: new Date(event.time)
            }}

        />
    )
}
