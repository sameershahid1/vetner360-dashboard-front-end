
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';


export async function middleware(request: Request) {
    const token = cookies().get("token")
    if (!token) {
        return NextResponse.rewrite(new URL('/login', request.url));
    }
    return NextResponse.next()
}


export const config = {
    matcher: [
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        },
    ],
};
