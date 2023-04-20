import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value;

	if (!token) {
		const url = request.nextUrl.clone();
		url.pathname = '/auth/login';
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: '/checkout/:path*'
};
