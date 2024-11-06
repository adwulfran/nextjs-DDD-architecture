
import EventsSearch from '../components/events/Search';
import EventsList from '../components/events/List';
import { GetServerSideProps, NextPage } from 'next';
import { find } from '../../db';
import styles from './styles.module.css'
import { IEvent } from '@/models/eventSchema';
import { IQuerySearch } from '@/models/querySearchSchema';
import Pagination from '@/components/events/Pagination';

interface EventProps {
  events: Partial<IEvent>[];
}


const IndexPage: NextPage<EventProps> = ({ events }) => {

  return (
    <div className={styles.main}>
      <h1>Events</h1>
      <EventsSearch />
      <EventsList events={events} />
      <div>
        <Pagination totalPages={events.length} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(`date : ${context.query.date}`)
  const events = find(context.query as IQuerySearch);
  return { props: { events } };
};

export default IndexPage;