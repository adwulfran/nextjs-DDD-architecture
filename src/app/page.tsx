
import EventsSearch from '../components/events/Search';
import EventsList from '../components/events/List';
import EventsFilter from '../components/events/Filters';
import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';

export interface ISearchQuery {
  title?: string;
  date?: string;
  format?: string;
  page?: string;
}

export default async function Page({ searchParams }: {
  searchParams: Promise<ISearchQuery>
}) {
  const query = await searchParams;

  return (
    <>
      <div className="flex flex-col items-center gap-[2vh] p-3" >
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



