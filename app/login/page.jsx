import { LoginClient } from './LoginClient';
import { connectDb } from '@/lib/db';
import { missingServerEnv } from '@/lib/env';
import User from '@/models/User';

export default async function LoginPage() {
  const missing = missingServerEnv();
  let hasUser = false;
  let setupError = '';

  if (missing.length) {
    setupError = `Missing required environment variables: ${missing.join(', ')}`;
  } else {
    try {
      await connectDb();
      hasUser = (await User.countDocuments()) > 0;
    } catch (error) {
      setupError = error instanceof Error ? error.message : 'Database connection failed.';
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5">
      <div className="card">
        <p className="text-xs uppercase tracking-[0.35em] text-command-gold">75 Command</p>
        <h1 className="mt-3 text-3xl font-black">Contract before mood.</h1>
        <p className="mt-2 text-stone-400">
          Single-user command center. The voice can speak. It cannot vote.
        </p>
        {setupError ? (
          <div className="mt-6 rounded-2xl border border-red-900/70 bg-red-950/30 p-4 text-sm text-red-100">
            <p className="font-black">Deployment setup is incomplete.</p>
            <p className="mt-2">{setupError}</p>
            <p className="mt-2 text-red-200">
              Add the required variables in Vercel Project Settings, then redeploy. Check{' '}
              <code>/api/health</code> for a machine-readable diagnosis.
            </p>
          </div>
        ) : (
          <LoginClient hasUser={hasUser} />
        )}
      </div>
    </main>
  );
}
