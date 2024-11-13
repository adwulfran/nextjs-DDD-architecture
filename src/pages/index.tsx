import EventsSearch from '../components/events/Search';
import EventsList from '../components/events/List';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import styles from './styles.module.css'
import { Event } from '@/domain/event';
import Pagination from '@/components/events/Pagination';
import EventsFilter from '@/components/events/Filters';
import { EventUseCase } from '@/use-case/EventUseCase';
import { FakeDbEventRepository } from '@/infrastructure/repositories/fakeDbEventRepository';
import { signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import authOptions from './api/auth/[...nextauth]';

interface EventProps {
  events: Partial<Event>[];
  session: { user: { name: string, email: string, image: string }, expires: string };
}

const IndexPage: NextPage<EventProps> = ({ events, session }) => {
  return (
    <>
      {session.user.name}
      <div className={styles.main}>
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out </button>
        <h1>Events</h1>
        <EventsSearch />
        <EventsFilter />
        <EventsList events={events} />
        <div>
          <Pagination totalPages={events.length} />
        </div>
      </div>

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

  const session = await getServerSession(context.req, context.res, authOptions);

  const eventRepository = new FakeDbEventRepository();
  const eventUseCase = new EventUseCase(eventRepository);
  const events = await eventUseCase.find(context.query as { [k: string]: string });
  return { props: { events, session } };
};

export default IndexPage;