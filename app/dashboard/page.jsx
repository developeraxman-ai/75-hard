import { AppShell } from '@/components/AppShell';
import { AttemptStatusCard } from '@/components/AttemptStatusCard';
import { ServerProblem } from '@/components/ServerProblem';
import { TodayChecklist } from '@/components/TodayChecklist';
import { connectDb } from '@/lib/db';
import { requirePageUser } from '@/lib/page-auth';
import { getTodayLog, serialize } from '@/lib/challenge';

export default async function Dashboard() {
  try {
    await connectDb();
  } catch (error) {
    return <ServerProblem title="Dashboard setup incomplete" error={error} />;
  }

  const user = await requirePageUser();

  try {
    const { attempt, log } = await getTodayLog(user);

    return (
      <AppShell
        title="Today"
        kicker={new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      >
        <div className="space-y-4">
          <AttemptStatusCard attempt={serialize(attempt)} log={serialize(log)} />
          <p className="font-bold text-stone-300">Do not negotiate.</p>
          <TodayChecklist initialLog={serialize(log)} />
        </div>
      </AppShell>
    );
  } catch (error) {
    return <ServerProblem title="Dashboard data unavailable" error={error} />;
  }
}
