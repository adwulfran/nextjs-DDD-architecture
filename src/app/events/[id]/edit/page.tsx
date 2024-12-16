import EventDetails from "@/components/events/Details";
import { FakeDbEventRepository } from "@/infrastructure/repositories/fakeDbEventRepository";
import { reformatDate } from "@/lib/reformatDate";
import { EventUseCase } from "@/use-case/EventUseCase";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    const eventRepository = new FakeDbEventRepository();
    const eventUseCase = new EventUseCase(eventRepository);
    const event = await eventUseCase.findById(id as string);

    if (!event) {
        notFound();
    }

    const session = await getServerSession();

    const readonly = event.creator === session?.user?.email;

    return (
        <EventDetails
            event={{
                ...event,
                date: new Date(reformatDate(`${event.date}`)),
                time: new Date(event.time)
            }}
            readonly={readonly}
        />
    )
}
