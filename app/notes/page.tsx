import Notes from './Notes.client';

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

interface NotesProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function NotesPage({ searchParams }: NotesProps) {
  const queryClient = new QueryClient();

  const { search = '', page = '1' } = await searchParams;
  const pageNumber = +page;

  await queryClient.prefetchQuery({
    queryKey: ['noteList', search, pageNumber],
    queryFn: () => fetchNotes(search, pageNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes initialSearch={search} initialPage={pageNumber} />
    </HydrationBoundary>
  );
}
