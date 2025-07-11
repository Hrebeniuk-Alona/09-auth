
"use client";

import css from './NotePreview.module.css'
import { useQuery } from "@tanstack/react-query";
import {fetchNoteById} from "../../lib/api";
import Loading from "../../app/loading";


type Props = {
    onClose: () => (void);
    id: number;
}

export default function NotePreview({onClose, id}:Props) {
    const { data: note, isLoading } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(Number(id)),
        refetchOnMount: false,
    })

 
    return (
        <>
            {isLoading && <Loading/>}
            {note && (
                <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <button className={css.backBtn} onClick={onClose}>
                Go back
              </button>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      )}
        </>)

}
