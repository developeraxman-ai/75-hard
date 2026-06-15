'use client';

import { useState } from 'react';

const options = [
  ['drink', 'Drink'],
  ['smoke', 'Smoke'],
  ['skip_workout', 'Skip workout'],
  ['junk_food', 'Eat junk'],
  ['waste_money', 'Waste money'],
  ['doom_scroll', 'Doom scroll'],
  ['other', 'Other'],
];

export function ImpulseLockTimer() {
  const [step, setStep] = useState('idle');
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({ type: 'drink', intensity: 5, trigger: '' });
  const [seconds, setSeconds] = useState(600);
  const [message, setMessage] = useState('');

  async function start() {
    const response = await fetch('/api/impulse', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(form),
    });
    const payload = await response.json();
    if (!response.ok) return;

    setEvent(payload.event);
    setStep('timer');
    const interval = setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          clearInterval(interval);
          setStep('choice');
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  }

  async function choose(finalChoice) {
    if (!event?._id) return;
    const response = await fetch('/api/impulse', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ eventId: event._id, finalChoice }),
    });

    if (response.ok) {
      setMessage(
        finalChoice === 'contract'
          ? 'Contract protected. Evidence collected.'
          : 'Day failed. Restart tomorrow morning. No spiral.',
      );
      setStep('done');
    }
  }

  if (step === 'idle') {
    return (
      <button className="btn-primary w-full py-8 text-xl" onClick={() => setStep('form')}>
        I am about to break
      </button>
    );
  }

  if (step === 'form') {
    return (
      <div className="card space-y-4">
        <h2 className="text-xl font-black">What are you about to do?</h2>
        <select
          className="input"
          value={form.type}
          onChange={(event) => setForm({ ...form, type: event.target.value })}
        >
          {options.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <label className="block">
          Intensity: {form.intensity}
          <input
            className="w-full accent-command-gold"
            type="range"
            min="1"
            max="10"
            value={form.intensity}
            onChange={(event) => setForm({ ...form, intensity: Number(event.target.value) })}
          />
        </label>
        <textarea
          required
          className="input"
          placeholder="Trigger / what caused this?"
          value={form.trigger}
          onChange={(event) => setForm({ ...form, trigger: event.target.value })}
        />
        <button className="btn-primary w-full" disabled={!form.trigger} onClick={start}>
          Start 10-minute lock
        </button>
      </div>
    );
  }

  if (step === 'timer') {
    return (
      <div className="card text-center">
        <p className="text-6xl font-black text-command-gold">
          {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
        </p>
        <div className="mt-6 space-y-3 text-lg font-bold">
          <p>You are not saying no forever. You are saying no for 10 minutes.</p>
          <p>The voice can speak. It cannot vote.</p>
          <p>Do not negotiate with the version of you that destroys your self-respect.</p>
        </div>
        <button className="btn-ghost mt-6" onClick={() => setStep('choice')}>
          Timer completed
        </button>
      </div>
    );
  }

  if (step === 'choice') {
    return (
      <div className="card space-y-3">
        <button className="btn-primary w-full" onClick={() => choose('contract')}>
          I choose the contract
        </button>
        <button className="btn-ghost w-full border-red-900 text-red-200" onClick={() => choose('impulse')}>
          I choose the impulse
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <p className="text-command-gold">{message}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          className="btn-ghost"
          onClick={() => fetch('/api/attempt', { method: 'POST', body: JSON.stringify({ when: 'tomorrow' }) }).then(() => { location.href = '/dashboard'; })}
        >
          Restart tomorrow
        </button>
        <button
          className="btn-primary"
          onClick={() => fetch('/api/attempt', { method: 'POST', body: JSON.stringify({ when: 'today' }) }).then(() => { location.href = '/dashboard'; })}
        >
          Restart now
        </button>
      </div>
    </div>
  );
}
