
import EventsSearch from '../components/events/Search';
import EventsList from '../components/events/List';
import { GetServerSideProps, NextPage } from 'next';
import { find } from '../../db';
import styles from './styles.module.css'
import { IEvent } from '@/models/eventSchema';

interface EventProps {
  events: Partial<IEvent>[];
}


const IndexPage: NextPage<EventProps> = ({ events }) => {

  return (
    <div className={styles.main}>
      <div>
        <h1>Events</h1>
      </div>
      <div >
        <EventsSearch  />
      </div>
      {/*<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>*/}
      <EventsList events={events} />
      {/* </Suspense>*/}
      <div>
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(`date : ${context.query.date}`)
  const events = find(context.query as Partial<IEvent>);
  return { props: { events } };
};

export default IndexPage;