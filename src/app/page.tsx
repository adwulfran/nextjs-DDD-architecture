
import { getServerSession } from 'next-auth';
import EventsSearch from '../components/events/Search';
import EventsList from '../components/events/List';
import EventsFilter from '../components/events/Filters';
import styles from './styles.module.css'
import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Button } from '../components/button';

export interface ISearchQuery {
  title?: string;
  date?: string;
  format?: string;
  page?: string;
}

export default async function Page({ searchParams }: {
  searchParams: Promise<ISearchQuery>
}) {
  const session = await getServerSession();
  const query = await searchParams;

  return (
    <>
      <div className={styles.main}>
        {session?.user?.name}
        <Button><span>Logout </span></Button>
        <h1>Events</h1>
        <EventsSearch />
        <EventsFilter />
        <Suspense fallback={<Skeleton variant="rectangular" width={210} height={60} />}>
          <EventsList query={query} />
        </Suspense>
        <div>
        </div>
      </div>
    </>
  )
}



