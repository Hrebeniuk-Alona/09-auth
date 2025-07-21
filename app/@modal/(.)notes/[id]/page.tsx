import { fetchNoteByIdServer } from "@/lib/api/serverApi"; 
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import PreviewClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
    const { id } = await params;

    const queryClient = new QueryClient;

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: ()=>fetchNoteByIdServer(id),
    })

  return (
<HydrationBoundary state={dehydrate(queryClient)}>
          <PreviewClient/>
        </HydrationBoundary>
  );
};

export default NotePreview;
