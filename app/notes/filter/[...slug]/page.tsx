import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";


type Props = {
    params: { slug?: string[] };
}

const NotesByTags = async ({ params }: Props) => {
    const slug = params.slug || [];
    const tag = slug[0] === 'All' ? '' : slug[0] || '';

    const response = await fetchNotes(1, 12, '', tag);
    
    return (
        <div>
            <h1>Notes List</h1>
           
            <NotesClient initialData={response} tag={tag} />
          
            
        </div>);
  };
  
  export default NotesByTags;
  