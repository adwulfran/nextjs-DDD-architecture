import EventsSearch from '../components/events/Search';
import EventsList from '../components/events/List';
import { GetServerSideProps, NextPage } from 'next';
import styles from './styles.module.css'
import { Event } from '@/domain/event';
import Pagination from '@/components/events/Pagination';
import EventsFilter from '@/components/events/Filters';
import { EventUseCase } from '@/use-case/EventUseCase';
import { InMemoryEventRepository } from '@/infrastructure/repositories/inMemoryEventRepository';


interface EventProps {
  events: Partial<Event>[];
}

const IndexPage: NextPage<EventProps> = ({ events }) => {

  return (
    <div className={styles.main}>
      <h1>Events</h1>
      <EventsSearch />
      <EventsFilter />
      <EventsList events={events} />
      <div>
        <Pagination totalPages={events.length} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const eventRepository = new InMemoryEventRepository();
  const eventUseCase = new EventUseCase(eventRepository);
  const events = await eventUseCase.find(context.query as { [k: string]: string });
  return { props: { events } };
};

export default IndexPage;