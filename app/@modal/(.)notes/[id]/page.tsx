import { fetchNoteById } from "@/lib/api/clientApi"; 
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import PreviewClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
    const { id } = await params;
    const noteId = Number(id);

    const queryClient = new QueryClient;

    await queryClient.prefetchQuery({
        queryKey: ["note", noteId],
        queryFn: ()=>fetchNoteById(noteId),
    })

  return (
<HydrationBoundary state={dehydrate(queryClient)}>
          <PreviewClient/>
        </HydrationBoundary>
  );
};

export default NotePreview;
