import * as React from 'react';
import { Event } from '@/domain/event';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { Card, CardContent, Button, Typography } from '@mui/material';


interface Props {
    event: Partial<Event>;
    goToDetail: () => void;
}

const EventCard : React.FC<Props> = ({ event, goToDetail }) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography gutterBottom sx={{
                    color: 'text.secondary',
                    fontSize: 14,
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <span>{event.date?.toString()}</span>
                    <span><Button onClick={goToDetail} color='inherit'><RemoveRedEyeRoundedIcon /></Button></span>
                </Typography>
                <Typography variant="h5" component="div" data-testid="submitted-text">
                    {event.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{event.location}</Typography>
            </CardContent>
        </Card>
    );
}

export default EventCard;