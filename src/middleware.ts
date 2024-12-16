import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';


export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Protected pages 
        '/',
        '/create-event',
        '/events/:id*',

        // Protected api routes 
        '/api/events',
        '/api/events/:id*'
    ]
}