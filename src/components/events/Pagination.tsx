'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import React from 'react';
import styles from "../styles.module.css";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface Props {
    totalPages: number;
}


const EventsPagination: React.FC<Props> = ({ totalPages }) => {
    const pathname = usePathname();

    const searchParams = useSearchParams();

    const currentPage = Number(searchParams!.get('page')) || 1;
    console.log("totalPages", totalPages)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams!);
        params.set('page', value.toString());
        window.location.href = `${pathname}?${params.toString()}`;
    };

    return (
        <>
            <Stack spacing={2}>
                <Typography>Page: {currentPage}</Typography>
                <Pagination count={Math.round(totalPages/5)+1} page={currentPage} onChange={handleChange} />
            </Stack>
            
        </>
    )
}

export default EventsPagination;