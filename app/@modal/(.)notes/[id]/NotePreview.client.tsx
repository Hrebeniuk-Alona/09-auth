"use client";

import Modal from "@/components/Modal/Modal";
import { useParams, useRouter } from "next/navigation";
import css from './NotePreview.module.css'
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi"; 
import Loading from "@/app/loading";


export default function PreviewClient() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const closeModal = () => router.back();


     const { data: note, isLoading } = useQuery({
        queryKey: ["note", id],
         queryFn: () => fetchNoteById(id),
         refetchOnMount: false,
        })

        return (
            <Modal onClose={closeModal}>
                <>
                    {isLoading && <Loading />}
                    {note && (
                        <div className={css.container}>
                            <div className={css.item}>
                                <div className={css.header}>
                                    <h2>{note.title}</h2>
                                    <button className={css.backBtn} onClick={closeModal}>
                                        Go back
                                    </button>
                                </div>
                                <p className={css.content}>{note.content}</p>
                                <p className={css.date}>{note.createdAt}</p>
                            </div>
                        </div>
                    )}
                </>
            </Modal>
        )

    }







