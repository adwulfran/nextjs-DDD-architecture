import EventCard from "./Card";
import styles from "../styles.module.css";
import Link from 'next/link';
import { FakeDbEventRepository } from '@/infrastructure/repositories/fakeDbEventRepository';
import { EventUseCase } from '@/use-case/EventUseCase';
import EventsPagination from './Pagination';


export default async function EventsList(props: {
    query?: {
        [k: string]: string;
    };
}) {
    const eventRepository = new FakeDbEventRepository();
    const eventUseCase = new EventUseCase(eventRepository);

    const query = props.query;
    const events = await eventUseCase.find(query ?? {});

    const limit = 5;
    const eventsPaginated = events.slice(
        query?.page ? (Number(query.page) - 1) * limit : 0,
        query?.page ? (Number(query.page) - 1) * limit + limit : limit,
    );

    return (
        <div className={styles.eventsListContainer}>
                <div className={styles.eventCards}>
                    {eventsPaginated?.map((event, index) => (
                        <EventCard
                            key={index}
                            event={event}
                        />
                    ))}
                </div>
                <EventsPagination totalPages={events.length} />
            <Link
                href="/events/create"
                className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                <span>Create</span>{' '}


            </Link>

        </div>
    )
}

