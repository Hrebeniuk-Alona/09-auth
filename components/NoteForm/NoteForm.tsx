'use client'; 

import css from "../NoteForm/NoteForm.module.css"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { NoteTag, NewNoteContent} from "@/types/note";
import { createNote } from "@/lib/api";
import { tags } from "@/lib/constans";




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
  const router = useRouter();
  const fieldId = useId();
  const [errors] = useState<Partial<NewNoteContent>>({})
  


    const mutation = useMutation({
        mutationFn: createNote, 
        onSuccess: () => {
          toast.success("Note created successfully!"); 
          router.push('/notes/filter/all');
        },
        onError: (error) => {
          toast.error(`Error creating note: ${error.message}`); 
        },
    });
  
  const handleSubmit=async(formData:FormData) =>{
    const values: NewNoteContent = {
  title: formData.get("title") as string,
  content: formData.get("content") as string,
  tag: formData.get("tag") as NoteTag,
};

mutation.mutate(values);


    
    try {
      await validationSchema.validate(values)
      mutation.mutate(values)
    }
    catch(error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(error.errors.join("\n"))
      }
    }
  }

    
  return (
    <form action={handleSubmit} className={css.form} >
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
          <input
            id={`${fieldId}-title`}
            type="text" name="title" 
           className={css.input}/>
         {(errors.title && <div className={css.error}>{errors.title}</div>) ||
          "\u00A0"}
      </div>
       

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea id={`${fieldId}-content`} name="content" rows={8} className={css.textarea} /> 
        {(errors.content && (
          <div className={css.error}>{ errors.content}</div>
        )) || "\u00A0"}
      </div>


      <div className={css.formGroup}>
        <label  htmlFor={`${fieldId}-tag`}>Tag</label>
        <select id={`${fieldId}-tag`} name="tag" className={css.select}>
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