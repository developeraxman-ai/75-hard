import User from '@/models/User';
import Attempt from '@/models/Attempt';
import DailyLog from '@/models/DailyLog';
import Journal from '@/models/Journal';
import { checklistKeys } from '@/types/domain';
import { dateKey, dayNumber, startOfUtcDay } from './date';

export async function ensureActiveAttempt(user) {
  let attempt = user.currentAttemptId ? await Attempt.findById(user.currentAttemptId) : null;

  if (!attempt) {
    attempt = await Attempt.create({
      userId: user._id,
      startDate: user.startDate || new Date(),
      status: 'active',
    });
    await User.findByIdAndUpdate(user._id, {
      currentAttemptId: attempt._id,
      startDate: attempt.startDate,
    });
  }

  attempt.currentDay = dayNumber(attempt.startDate);
  await attempt.save();
  return attempt;
}

export async function getTodayLog(user) {
  const attempt = await ensureActiveAttempt(user);
  const today = startOfUtcDay();
  const currentDay = dayNumber(attempt.startDate);
  const log = await DailyLog.findOneAndUpdate(
    { attemptId: attempt._id, date: today },
    {
      $setOnInsert: {
        userId: user._id,
        attemptId: attempt._id,
        date: today,
        dayNumber: currentDay,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  return { attempt, log };
}

export async function canComplete(log) {
  const journal = await Journal.exists({ attemptId: log.attemptId, date: log.date });
  return (
    checklistKeys.every((key) => Boolean(log.checklist?.[key]))
    && log.waterLitres >= 3.5
    && Boolean(log.progressPhotoUrl)
    && Boolean(journal)
  );
}

export async function completeIfReady(log) {
  if (!(await canComplete(log))) return false;

  log.completed = true;
  await log.save();

  const completedDays = await DailyLog.countDocuments({ attemptId: log.attemptId, completed: true });
  if (completedDays >= 75) {
    await Attempt.findByIdAndUpdate(log.attemptId, { status: 'completed', completedAt: new Date() });
  }
  return true;
}

export async function failActiveAttempt(user, reason) {
  const { attempt, log } = await getTodayLog(user);
  log.failed = true;
  log.completed = false;
  log.failureReason = reason;
  await log.save();

  attempt.status = 'failed';
  attempt.failedAt = new Date();
  attempt.failureReason = reason;
  await attempt.save();
  return { attempt, log };
}

export function serialize(doc) {
  return JSON.parse(JSON.stringify(doc));
}

export const todayKey = () => dateKey(new Date());

// TODO: Add future automatic day validation after V1; do not auto-fail at midnight yet.
