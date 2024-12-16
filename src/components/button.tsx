"use client";
import clsx from 'clsx';
import { signOut } from 'next-auth/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
    
  return (
    <button
      {...rest}
      
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      {children}
    </button>
  );
}