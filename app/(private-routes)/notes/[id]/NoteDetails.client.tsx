"use client";
import css from "./NoteDetails.module.css"
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api/serverApi"; 



const NoteDetailsClient = () => {

  const params = useParams();
  const id = Number(params.id);

    const { data: note, error, isLoading } = useQuery({
        queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
      enabled: !Number.isNaN(id) && Boolean(id),
        refetchOnMount: false,
    })

    if (!id || Number.isNaN(id)) return <p>Invalid ID</p>;
    if (isLoading) return <p>Loading, please wait...</p>
    
  if (error || !note) return <p>Something went wrong.</p>
  

 return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );


}

export default NoteDetailsClient