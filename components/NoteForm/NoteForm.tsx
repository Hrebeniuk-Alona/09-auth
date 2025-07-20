'use client'; 

import css from "../NoteForm/NoteForm.module.css"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useId, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { NoteTag, NewNoteContent} from "@/types/note";
import { createNote } from "@/lib/api/clientApi"; 
import { tags } from "@/lib/constans";
import { useNoteDraft } from "@/lib/store/noteStore";



  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title must be at most 50 characters")
      .required("Title is required"),
    content: Yup.string().max(500, "Content must be at most 500 characters"),
    tag: Yup.string<NoteTag>() 
      .oneOf(
        ["Todo", "Work", "Personal", "Meeting", "Shopping"],
        "Invalid tag selected"
      )
      .required("Tag is required"),
  });


export default function NoteForm() {
  const queryClient = useQueryClient(); 

  const router = useRouter();
  const fieldId = useId();
  const [errors] = useState<Partial<NewNoteContent>>({});
  const { draft, setDraft, clearDraft} = useNoteDraft();
  


    const mutation = useMutation({
        mutationFn: createNote, 
      onSuccess: () => {
          clearDraft()
           queryClient.invalidateQueries({ queryKey: ["notes"] });
          toast.success("Note created successfully!"); 
          router.back();
        },
        onError: (error) => {
          toast.error(`Error creating note: ${error.message}`); 
        },
    });
  
  const handleSubmit=async(formData:FormData) =>{ 
    try {const values: NewNoteContent = {
     title: formData.get("title") as string,
     content: formData.get("content") as string,
     tag: formData.get("tag") as NoteTag,
    }

      await validationSchema.validate(values)
      mutation.mutate(values)
    }
    catch(error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(error.errors.join("\n"))
      } else {
    toast.error("Unexpected error. See console for details.");
    console.error("handleSubmit error:", error);
  }
    }
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    })
  };

    
  return (
    <form action={handleSubmit} className={css.form} >
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
          <input
            id={`${fieldId}-title`}
            type="text" name="title" 
          className={css.input}
         defaultValue={draft?.title} onChange={handleChange}/>
         {(errors.title && <div className={css.error}>{errors.title}</div>) ||
          "\u00A0"}
      </div>
       

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea id={`${fieldId}-content`} name="content" className={css.textarea} defaultValue={draft?.content} onChange={handleChange} /> 
        {(errors.content && (
          <div className={css.error}>{ errors.content}</div>
        )) || "\u00A0"}
      </div>


      <div className={css.formGroup}>
        <label  htmlFor={`${fieldId}-tag`}>Tag</label>
        <select id={`${fieldId}-tag`} name="tag" className={css.select} defaultValue={draft?.tag} onChange={handleChange}>
          {tags.map((tag) =>(
              <option key={tag} value={tag}>
              {tag}
            </option>)
          )}
        </select>
        {(errors.tag && (<div className={css.error}>{errors.tag}</div>)) || "\u00A0"}
      </div>
      

      <div className={css.action}>
        <button type="button" className={css.cancelButton}
        onClick={()=>router.back()}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? "Creating..." : "Create note"}
      </button>
      </div>

      </form>

    )
}