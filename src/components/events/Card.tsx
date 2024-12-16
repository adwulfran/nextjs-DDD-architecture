import * as React from 'react';
import { Event } from '@/domain/event';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import  Card   from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


interface Props {
    event: Partial<Event>;
}

export default  function EventCard({ event }: Props) {

    return (<>
       <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography gutterBottom sx={{
                    color: 'text.secondary',
                    fontSize: 14,
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <span>{event.date?.toString()}</span>
                    <span>
                        <Link href={`/events/${event.id}/edit`}>
                            <RemoveRedEyeRoundedIcon /></Link>
                    </span>
                </Typography>
                <Typography variant="h5" component="div" data-testid="submitted-text">
                    {event.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{event.location}</Typography>
            </CardContent>
        </Card>
    </>
    );
}

