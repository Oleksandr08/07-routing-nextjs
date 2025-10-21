import NotePreviewClient from './NotePreview.client';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';

interface NoteDetailProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({ params }: NoteDetailProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}
