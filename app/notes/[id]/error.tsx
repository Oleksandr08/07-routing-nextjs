'use client';

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
    </div>
  );
}
