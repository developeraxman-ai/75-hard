export function ServerProblem({ title = 'Command center unavailable', error }) {
  const message = error instanceof Error ? error.message : 'Unknown server error';

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5">
      <section className="card border-red-900/70 bg-red-950/20">
        <p className="text-xs uppercase tracking-[0.35em] text-command-gold">75 Command</p>
        <h1 className="mt-3 text-3xl font-black">{title}</h1>
        <p className="mt-3 text-stone-300">
          The app caught a server configuration/data error instead of crashing the page.
        </p>
        <p className="mt-4 rounded-2xl border border-red-900/70 bg-black/30 p-3 text-sm text-red-100">
          {message}
        </p>
        <p className="mt-4 text-sm text-stone-400">
          Check <code>/api/health</code>, MongoDB Atlas access, and the Vercel environment variables.
        </p>
      </section>
    </main>
  );
}
