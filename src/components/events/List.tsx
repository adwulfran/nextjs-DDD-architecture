'use client';

import { useRouter } from "next/navigation";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styles from "./styles.module.css"

export default function EventsList({ items }: { items: { title: string }[] }) {
    const router = useRouter()

    return (
        <div>
            {items?.map((item, index) => (<div key={index}>{item.title}</div>))}
            <AddCircleOutlineIcon
                fontSize="large"
                className={styles.addIcon}
                onClick={() => router.push('/create-event')}
            />
        </div>
    )
}