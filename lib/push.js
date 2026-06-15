import webpush from 'web-push';
export function configurePush(){ const pub=process.env.VAPID_PUBLIC_KEY, priv=process.env.VAPID_PRIVATE_KEY, subj=process.env.VAPID_SUBJECT; if(pub&&priv&&subj) webpush.setVapidDetails(subj,pub,priv); return webpush; }
export const notificationCopy={morning:'Day X. Contract before mood.',midday:"Water + reading check. Don’t leave everything for night.",evening:'Danger window. Friends, boredom, impulse. Stay ahead.',night:'Complete checklist. No lying.',emergency:'Open Impulse Lock before you break.'};
