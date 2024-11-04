
import EventsSearch from '../components/events/Search';
import EventsList from '../components/events/List';
import { GetServerSideProps, NextPage } from 'next';


import { find } from '@/db';

interface EventProps {
  items: {
    title: string;
    format?: string;
  }[];
}
const EventPage: NextPage<EventProps> = ({ items }) => {

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between text-blue-500">
        <h1>Events</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <EventsSearch  />
        {/* <CreateInvoice /> */}
      </div>
      {/*<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>*/}
      <EventsList items={items} />
      {/* </Suspense>*/}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>

      <div></div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const items = find(context.query as { title: string, format?: string });
  return { props: { items } };
};

export default EventPage