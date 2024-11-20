import { NextResponse } from 'next/server';

export default async function middleware(req: Request) {
  const url = new URL(req.url);
  const publicRoutes = [
    '/',
    '/api/clerk-webhook',
    '/api/drive-activity/notification',
    '/api/payment/success',
  ];

  const ignoredRoutes = [
    '/api/auth/callback/discord',
    '/api/auth/callback/notion',
    '/api/auth/callback/slack',
    '/api/flow',
    '/api/cron/wait',
  ];

  const isPublicRoute = publicRoutes.includes(url.pathname);
  const isIgnoredRoute = ignoredRoutes.includes(url.pathname);

  // Allow access to public or ignored routes
  if (isPublicRoute || isIgnoredRoute) {
    return NextResponse.next();
  }

  // Protect other routes
  const headers = new Headers(req.headers);
  const authHeader = headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  // Example token verification logic here
  const isTokenValid = await verifyToken(token); // Implement `verifyToken` for your use case

  if (!isTokenValid) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};

// Example token verification logic (to be implemented based on your backend or Clerk setup)
async function verifyToken(token: string): Promise<boolean> {
  // Verify token logic (example only)
  // Use Clerk's backend SDK or any JWT library if applicable
  return true; // Replace with actual verification result
}


// https://www.googleapis.com/auth/userinfo.email
// https://www.googleapis.com/auth/userinfo.profile
// https://www.googleapis.com/auth/drive.activity.readonly
// https://www.googleapis.com/auth/drive.metadata
// https://www.googleapis.com/auth/drive.readonly
