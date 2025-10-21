'use client';

import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  return (
    <>
      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}

      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data?.title}</h2>
          </div>
          <p className={css.content}>{data?.content}</p>
          <p className={css.date}>{data?.createdAt}</p>
        </div>
      </div>
    </>
  );
}
