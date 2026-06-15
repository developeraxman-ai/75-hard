export const MS_DAY=86400000;
export function startOfUtcDay(input = new Date()){return new Date(Date.UTC(input.getUTCFullYear(),input.getUTCMonth(),input.getUTCDate()))}
export function dateKey(input = new Date()){return startOfUtcDay(input).toISOString().slice(0,10)}
export function dayNumber(start, now = new Date()){return Math.max(1, Math.min(75, Math.floor((startOfUtcDay(now).getTime()-startOfUtcDay(start).getTime())/MS_DAY)+1))}
export function addDays(date, days){const d=startOfUtcDay(date); d.setUTCDate(d.getUTCDate()+days); return d}
