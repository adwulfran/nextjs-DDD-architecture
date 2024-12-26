"use client";

import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

export default function DropDown({ initials }: { initials: string }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Avatar>
                    <Image src={initials} alt="" fill />
                </Avatar>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
                <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>Logout</MenuItem>
            </Menu>
        </div>
    )
}