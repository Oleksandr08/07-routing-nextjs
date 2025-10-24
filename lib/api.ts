import axios from 'axios';
import type { Note } from '@/types/note';

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
  params: {
    perPage: 12,
  },
});

export interface FetchNotesResponse {
  notes: Note[] | [];
  totalPages: number;
}

interface NewNote {
  title: string;
  tag: string;
  content: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchNotes(
  search?: string,
  page?: number,
  tag?: string
): Promise<FetchNotesResponse> {
  console.log(`Я отримую нотатки із сторінки ${page}`);

  await delay(1000);
  try {
    const response = await instance.get<FetchNotesResponse>('notes', {
      params: { search, page, tag },
    });
    console.log(response.data);
    return { notes: response.data.notes, totalPages: response.data.totalPages };
  } catch (error) {
    console.log('The error happend', error);
    throw error;
  }
}

export async function createNote(newNote: NewNote): Promise<Note> {
  console.log('Я створюю нову нотатку', newNote);
  const response = await instance.post<Note>('notes', newNote);
  console.log(response.data);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  console.log('Я видалю нотатку');
  const response = await instance.delete<Note>(`notes/${id}`);
  console.log(response.data);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  await delay(3000);
  const response = await instance.get<Note>(`notes/${id}`);
  return response.data;
}
