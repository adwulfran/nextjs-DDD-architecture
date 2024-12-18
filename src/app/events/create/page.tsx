import EventsCreation from '@/components/events/Creation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create event',
};

export default async function Page() {
    return (<EventsCreation/>)
}