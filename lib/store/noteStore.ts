import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewNoteContent } from '@/types/note';

type NoteDraftStore = {
    draft: NewNoteContent;
    setDraft: (note: NewNoteContent) => void;
    clearDraft: () => void;
}

const initialDraft :NewNoteContent={
  title: '',
  content: '',
  tag: 'Todo',
};


export const useNoteDraft = create<NoteDraftStore>()(
    persist(
        (set) => {
    return {
        draft: initialDraft,
        setDraft: (note)=> 
     set(()=>({draft: note})),
        clearDraft: () =>  set(()=>({draft:initialDraft}))
            }
    },
     {
        name: 'note-draft',
        partialize:(state)=>({draft:state.draft}) 
    }
            
    )
)