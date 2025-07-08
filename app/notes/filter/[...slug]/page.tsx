import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
    params:{slug?:string[]}
}

const NotesByTags = async ({ params }: Props) => {
    const slug=params.slug||[]
    const category = slug[0] === 'all' ? undefined : slug[0];
        
    const response= await fetchNotes(1, 12, "",category)


    return (
        <div>
            <h1>Notes List</h1>
            {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
        </div>);
  };
  
  export default NotesByTags;
  