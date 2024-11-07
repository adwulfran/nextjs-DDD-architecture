'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import React from 'react';
import styles from "../styles.module.css";


interface Props {
    totalPages: number;
}


const Pagination: React.FC<Props> = ({ totalPages }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const currentPage = Number(searchParams.get('page')) || 1;

    function handleBackPage() {
        const params = new URLSearchParams(searchParams);
        params.set('page', (currentPage - 1).toString());
        replace(`${pathname}?${params.toString()}`);
    }

    function handleForwardPage() {
        const params = new URLSearchParams(searchParams);
        params.set('page', (currentPage + 1).toString());
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            {currentPage > 1 ? <ArrowBack onClick={handleBackPage} /> : (<></>)}

            <span className={styles.pageNumber}>{currentPage}</span>

            {currentPage < totalPages ? <ArrowForward onClick={handleForwardPage} /> : <></>}
        </>
    )
}

export default Pagination;