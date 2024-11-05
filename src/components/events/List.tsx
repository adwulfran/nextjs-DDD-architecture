'use client';

import Link from "next/link";

export default function EventsList({ items }: { items: { title: string }[] }) {

    return (
        <div>
            {items?.map((item, index) => (<div key={index}>{item.title}</div>))}
            <Link href="/create-event">Create Event</Link>
        </div>
    )
}