import { fetchNotes } from "@/lib/api/clientApi"; 
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
   params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } =await params;
    const tag = slug[0] === "All" ? undefined : slug[0];
    
    const readableTag = tag ? tag[0].toUpperCase() + tag.slice(1) : "All Notes"
    
    const description = tag
  ? `Browse all notes tagged with "${readableTag}". Add, manage, and plan your tasks efficiently.`
  : "Browse all notes in NoteHub. Add, manage, and plan your tasks efficiently.";

    
    return {
        title: `${readableTag}– Notes | NoteHub`,
        description,
        openGraph: {
            title: `${readableTag}– Notes | NoteHub`,
            description,
            url: `https://08-zustand-seven.vercel.app/notes/filter/${tag ?? "All"}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: "NoteHub tasks plan preview",
            }
            ],
            type: "website",

        }
  }
    }


export default async function NotesByTags({ params }: Props){
    const { slug } = await params;
    const tag = slug[0] === "All" ? undefined : slug[0];

    const response = await fetchNotes(1, 12, "", tag);
    
    return  <NotesClient initialData={response} tag={tag} />
  };
  

  