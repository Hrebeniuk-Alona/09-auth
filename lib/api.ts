import axios from "axios";
import { Note } from "@/types/note";


export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";




export type NewNoteContent= {
    title: string;
    content: string;
    tag: NoteTag;
  }
  
  export type PaginatedNotesResponse ={
    notes: Note[];
    page: number;
    totalPages: number;
    totalResults: number;
  }


const BASE_URL = "https://notehub-public.goit.study/api";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;


const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = ""
): Promise<PaginatedNotesResponse> => {
  const response = await axiosConfig.get<PaginatedNotesResponse>("/notes", {
    params: {
      page,
      ...(search !== "" && { search: search }),
      perPage,
    },
  });

  return response.data;
};




export const createNote = async (content: NewNoteContent): Promise<Note> => {
  const response = await axiosConfig.post<Note>("/notes", content);
    return response.data;
  
};


export const deleteNote = async (id: number): Promise<Note> => {
  const res = await axiosConfig.delete<Note>(`/notes/${id}`);
  return res.data
}



export const fetchNoteById = async (id: number) => {
  const res = await axiosConfig.get<Note>(`/notes/${id}`)
  return res.data
}