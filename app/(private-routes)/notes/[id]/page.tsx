
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi"; 
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type Props = {
    params: Promise<{id:string}>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const noteId = Number(id);
    const note = await fetchNoteById(noteId)
     
    

    return {
        title: note.title,
        description: note.content,
        openGraph: {
            title: `${note.title} – Notes | NoteHub`,
            description: note.content,
            url: `https://notehub-public.goit.study/api/notes/${note.id ?? "All"}`,
            images: [
                {
                    url: `https://opengraph.b-cdn.net/production/og-image/d96f0dfd-699a-479d-ac06-bdb53631d349.png?expires=33288302765&token=ywDpHK6KmEtpWc8I4n3BiDWO-Br1mL5Md-mnrdW6XqA`,
                    width: 1200,
                    height: 630,
                    alt: "NoteHub tasks plan preview",
            }
            ],
            type: "website",

        }
  }
    }



const NoteDetails = async ({params}:Props) => {
    const { id } = await params;
    const noteId = Number(id);

    const queryClient = new QueryClient;

    await queryClient.prefetchQuery({
        queryKey: ["note", noteId],
        queryFn: ()=>fetchNoteById(noteId),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient/>
        </HydrationBoundary>
    )
}

export default NoteDetails