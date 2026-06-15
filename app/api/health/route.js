import { NextResponse } from 'next/server';
import { missingServerEnv, optionalPushEnv } from '@/lib/env';

export async function GET() {
  const missing = missingServerEnv();
  const missingPush = optionalPushEnv.filter((key) => !process.env[key]);

  return NextResponse.json(
    {
      ok: missing.length === 0,
      app: '75 Command',
      missing,
      missingPush,
      message: missing.length
        ? 'Configure required Vercel environment variables before using the app.'
        : 'Core environment is configured.',
    },
    { status: missing.length ? 503 : 200 },
  );
}
