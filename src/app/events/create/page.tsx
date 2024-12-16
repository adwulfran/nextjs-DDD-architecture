import EventsCreation from '@/components/events/Creation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function Page() {
    return (<EventsCreation/>)
}