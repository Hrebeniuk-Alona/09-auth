import NotesClient from '@/components/NotesClient/NotesClient';
import { FetchNotesResponse } from '@/lib/api';


interface Props {
  initialData: FetchNotesResponse;
  tag:string
}


export default function NotesClientWrapper(props: Props) {
  return (
    <NotesClient {...props}/>
  )
}
