import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
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
            url: `https://notehub-public.goit.study/api/notes/${tag ?? "All"}`,
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


const NotesByTags = async ({ params }: Props) => {
    const { slug } = await params;
    const tag = slug[0] === "All" ? undefined : slug[0];

    const response = await fetchNotes(1, 12, '', tag);
    
    return (
        <div>
            <h1>Notes List</h1>
           
            <NotesClient initialData={response} tag={tag} />
          
            
        </div>);
  };
  
  export default NotesByTags;
  