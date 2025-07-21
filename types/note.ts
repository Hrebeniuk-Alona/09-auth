export interface Note{
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tag: NoteTag
}

export interface DeletedNoteInfo {
  deletedNoteId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export type FetchNotesResponse = {
    notes: Note[];
    totalPages: number;
}

export interface NewNoteContent {
    title: string;
    content?: string;
    tag: NoteTag
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";