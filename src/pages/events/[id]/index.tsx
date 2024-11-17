import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import EventDetails from "@/components/events/Details";
import { FakeDbEventRepository } from "@/infrastructure/repositories/fakeDbEventRepository";
import { EventUseCase } from "@/use-case/EventUseCase";
import { Event } from "@/domain/event";


interface Props {
    event: Event;
}

const EventDetailPage: NextPage<Props> = ({ event }) => {
    return <EventDetails event={event} />
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const eventRepository = new FakeDbEventRepository();
    const eventUseCase = new EventUseCase(eventRepository);
    const id = context.params?.id;

    const event = await eventUseCase.findById(id as string);
    return { props: { event } };
};

export default EventDetailPage;