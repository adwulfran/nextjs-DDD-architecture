import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const EventsFilter: React.FC = () => {
    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams);
        params.set('radio', event.target.value.toString());
        params.delete('date');
        params.delete('page');
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <FormControl sx={{ display: "flex" }}>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={handleChange}
                row
            >
                <FormControlLabel value="futur" control={<Radio />} label="Future" />
                <FormControlLabel value="previous" control={<Radio />} label="Previous" />
            </RadioGroup>
        </FormControl>
    );
}

export default EventsFilter;