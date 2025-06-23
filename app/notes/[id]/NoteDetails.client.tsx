"use client";
import css from "./NoteDetails.module.css"
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { useState } from "react";
import NoteModal from "@/components/NoteModal/NoteModal";




const NoteDetailsClient = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const id = Number(params.id);


    const { data: note, error, isLoading } = useQuery({
        queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
      enabled: !Number.isNaN(id) && Boolean(id),
        refetchOnMount: false,
    })
  
  
    const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  

    if (!id || Number.isNaN(id)) return <p>Invalid ID</p>;
    if (isLoading) return <p>Loading, please wait...</p>
    
  if (error || !note) return <p>Something went wrong.</p>
  

    
  return (
      
    <div className={css.container}>
      <div className={css.item}>
          <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn} onClick={openModal}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
       </div>
       {isModalOpen && <NoteModal onClose={closeModal} />}
    </div>
    
    

    )

}

export default NoteDetailsClient