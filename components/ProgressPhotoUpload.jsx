'use client';

import { useState } from 'react';

export function ProgressPhotoUpload({ url, onUploaded }) {
  const [preview, setPreview] = useState(url);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function upload(file) {
    setError('');
    if (!file.type.startsWith('image/')) return setError('Image files only.');
    if (file.size > 6 * 1024 * 1024) return setError('Max 6MB.');

    setPreview(URL.createObjectURL(file));
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/upload', { method: 'POST', body: formData });
    const payload = await response.json();
    setLoading(false);

    if (!response.ok) return setError(payload.error || 'Upload failed');
    setPreview(payload.log.progressPhotoUrl);
    onUploaded(payload.log);
  }

  return (
    <div className="card">
      <p className="font-black">Progress photo</p>
      <p className="text-sm text-stone-400">Photo is not vanity. Photo is evidence.</p>
      {preview && <img src={preview} alt="Progress preview" className="mt-3 max-h-80 w-full rounded-2xl object-cover brightness-75" />}
      <input
        aria-label="Upload progress photo"
        className="mt-4 block w-full text-sm"
        type="file"
        accept="image/*"
        onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])}
      />
      {loading && <p className="mt-2 text-command-gold">Uploading evidence…</p>}
      {error && <p className="mt-2 text-red-300">{error}</p>}
    </div>
  );
}
