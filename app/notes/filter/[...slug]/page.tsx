import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";


type Props = {
    params: Promise<{ slug: string[] }>;
}

const NotesByTags = async ({ params }: Props) => {
    const { slug } = await params;
    const tag = slug?.[0] || '';
    const safeTag = tag === 'All' ? '': tag[0];
        
    const response = await fetchNotes(1, 12, "", safeTag)
    
    return (
        <div>
            <h1>Notes List</h1>
           
            <NotesClient initialData={response} tag={tag} />
          
            
        </div>);
  };
  
  export default NotesByTags;
  