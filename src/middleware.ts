import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    // Get the token from the request using NextAuth's getToken utility
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    // If no token is found, redirect to the login page
    if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // If the token exists, allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        /** PROTECTED PAGES */
        '/',
        '/create-event',
        '/events/:id*',

        /** PROTECTED API ROUTES */
        '/api/events',
        '/api/events/:id*'
    ]
};