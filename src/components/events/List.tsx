import EventCard from "./Card";
import styles from "../styles.module.css";
import Link from 'next/link';
import EventsPagination from './Pagination';
import { ISearchQuery } from "@/app/page";
import { fetchEvents } from "@/lib/data";


export default async function EventsList(props: { query?: ISearchQuery }) {

    const query: Omit<ISearchQuery, 'title'> & { title?: { $regex: string; $options: string } } = {};
    if (props.query) {
        if (props.query.title) {
            query.title = { $regex: props.query.title, $options: 'i' };
        }
        if (props.query.format) {
            query.format = props.query.format;
        }
        if (props.query.date) {
            query.date = props.query.date;
        }
     
    }

    const { eventsPaginated, numberOfEvents } = await fetchEvents(query,props.query?.page);
  

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
            <EventsPagination totalPages={numberOfEvents} />
            <Link
                href="/events/create"
                className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                <span>Create</span>{' '}
            </Link>

        </div>
    )
}

