import { AppShell } from '@/components/AppShell';
import { AttemptStatusCard } from '@/components/AttemptStatusCard';
import { FailureHistory } from '@/components/FailureHistory';
import { ProgressPhotoGrid } from '@/components/ProgressPhotoGrid';
import { ServerProblem } from '@/components/ServerProblem';
import { connectDb } from '@/lib/db';
import { requirePageUser } from '@/lib/page-auth';
import { ensureActiveAttempt, serialize } from '@/lib/challenge';
import Attempt from '@/models/Attempt';
import DailyLog from '@/models/DailyLog';
import ImpulseEvent from '@/models/ImpulseEvent';

export default async function Progress() {
  try {
    await connectDb();
  } catch (error) {
    return <ServerProblem title="Progress setup incomplete" error={error} />;
  }

  const user = await requirePageUser();

  try {
    const current = await ensureActiveAttempt(user);
    const attempts = await Attempt.find({ userId: user._id }).sort({ createdAt: -1 });
    const logs = await DailyLog.find({ userId: user._id }).sort({ date: -1 });
    const events = await ImpulseEvent.find({ userId: user._id }).sort({ createdAt: -1 });
    const completed = logs.filter((log) => log.completed).length;
    const failedAttempts = attempts.filter((attempt) => attempt.status === 'failed').length;
    const contract = events.filter((event) => event.finalChoice === 'contract').length;
    const impulse = events.filter((event) => event.finalChoice === 'impulse').length;

    return (
      <AppShell title="Progress" kicker="Evidence beats mood.">
        <div className="space-y-4">
          <AttemptStatusCard attempt={serialize(current)} />
          <section className="grid grid-cols-2 gap-3">
            <div className="card"><p className="text-3xl font-black">{completed}</p><p className="text-stone-400">Completed days</p></div>
            <div className="card"><p className="text-3xl font-black">{failedAttempts}</p><p className="text-stone-400">Failed attempts</p></div>
            <div className="card"><p className="text-3xl font-black">{events.length}</p><p className="text-stone-400">Impulse events</p></div>
            <div className="card"><p className="text-3xl font-black">{contract}/{impulse}</p><p className="text-stone-400">Contract / impulse</p></div>
          </section>
          <section className="card">
            <h2 className="text-xl font-black">Attempt history</h2>
            <p className="text-stone-400">Previous attempts are not deleted. They show the pattern.</p>
            <ul className="mt-4 space-y-2">
              {attempts.map((attempt) => (
                <li key={attempt._id} className="flex justify-between border-b border-command-line py-2">
                  <span>{new Date(attempt.startDate).toLocaleDateString()}</span>
                  <span className="uppercase text-command-gold">{attempt.status}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="card">
            <h2 className="text-xl font-black">Daily completion list</h2>
            <ul className="mt-3 space-y-1 text-sm">
              {logs.map((log) => (
                <li key={log._id} className="flex justify-between">
                  <span>Day {log.dayNumber}</span>
                  <span>{log.completed ? 'Complete' : log.failed ? 'Failed' : 'Open'}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="card">
            <h2 className="mb-3 text-xl font-black">Progress photos</h2>
            <ProgressPhotoGrid logs={serialize(logs)} />
          </section>
          <FailureHistory logs={serialize(logs)} events={serialize(events)} />
        </div>
      </AppShell>
    );
  } catch (error) {
    return <ServerProblem title="Progress data unavailable" error={error} />;
  }
}
