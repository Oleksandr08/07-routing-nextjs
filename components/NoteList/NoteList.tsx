import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import type { Note } from '../../types/note.ts';
import css from './NoteList.module.css';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface NoteListProps {
  notes?: Note[];
}

export default function NoteList({ notes = [] }: NoteListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: data => {
      toast.success(
        `The note ${data.title} was removed successfully from your notelist`,
        { duration: 4000 }
      );
      queryClient.invalidateQueries({ queryKey: ['noteList'] });
    },
    onError: () => {
      toast.error("Something went wrong! I can't delete this note", {
        duration: 4000,
      });
      console.log('Видалити не вийшло');
    },
  });

  const handleDeleteNote = (id: string) => {
    mutation.mutate(id);
  };
  return (
    <ul className={css.list}>
      {notes.map(note => {
        return (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link className={css.button} href={`../${note.id}`}>
                View details
              </Link>

              <button
                onClick={() => handleDeleteNote(note.id)}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}

      {/* Набір елементів списку нотаток */}
    </ul>
  );
}
