
import EventsSearch from '../components/events/Search';
import EventsList from '../components/events/List';
import { GetServerSideProps, NextPage } from 'next';
import { find } from '@/db';
import styles from './styles.module.css'

interface EventProps {
  events: {
    title: string;
    format?: string;
  }[];
}


const EventPage: NextPage<EventProps> = ({ events }) => {

  return (
    <div className={styles.main}>
      <div>
        <h1>Events</h1>
      </div>
      <div >
        <EventsSearch  />
      </div>
      {/*<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>*/}
      <EventsList items={events} />
      {/* </Suspense>*/}
      <div>
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(`date : ${context.query.date}`)
  const events = find(context.query as { title: string, format?: string, date?:string; });
  return { props: { events } };
};

export default EventPage