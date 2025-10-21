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
  params: Promise<{
    slug: string[];
  }>;
}

export default async function NotesPage({ searchParams, params }: NotesProps) {
  const queryClient = new QueryClient();

  const { search = '', page = '1' } = await searchParams;

  const pageNumber = +page;

  const { slug } = await params;
  const tag = slug[0] && slug[0] !== 'All' ? slug[0] : undefined;

  await queryClient.prefetchQuery({
    queryKey: tag
      ? ['noteList', search, pageNumber, tag]
      : ['noteList', search, pageNumber],
    queryFn: () => fetchNotes(search, pageNumber, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes initialSearch={search} initialPage={pageNumber} tag={tag} />
    </HydrationBoundary>
  );
}
