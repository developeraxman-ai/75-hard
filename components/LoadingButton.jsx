'use client';

export function LoadingButton({ loading, children, ...props }) {
  return (
    <button {...props} disabled={props.disabled || loading}>
      {loading ? 'Working…' : children}
    </button>
  );
}
