"use client";

import Modal from "@/components/Modal/Modal";
import { useParams, useRouter } from "next/navigation";
import NotePreview from "@/components/NotePreview/NotePreview";


export default function PreviewClient() {
    const router = useRouter();
    const { id } = useParams();
    const closeModal = () => router.back();

    return (
        <Modal onClose={closeModal}>
            <NotePreview  onClose={closeModal} id={Number(id)}/>


        </Modal>
    )
    


}