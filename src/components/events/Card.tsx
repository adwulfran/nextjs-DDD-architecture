import * as React from 'react';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import  Card   from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { IEvent } from '@/models/Event';


interface Props {
    event: Partial<IEvent>;
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
                    <span>{event.date?.toString().slice(0,15)}</span>
                    <span>
                        <Link href={`/events/${event._id}/edit`}>
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

