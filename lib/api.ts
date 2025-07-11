import axios from "axios";
import { Note, NewNoteContent} from "@/types/note";

  
export type FetchNotesResponse ={
  notes: Note[];
  totalPages: number;
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
  perPage:number=12,
  search: string = "",
  tag?:string
): Promise<FetchNotesResponse> => {
  const response = await axiosConfig.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search !== "" && { search:search}),
      ...(tag?.trim() ? { tag: tag.trim() } : {})
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


export const fetchNoteById = async (id: number):Promise<Note> => {
  const res = await axiosConfig.get<Note>(`/notes/${id}`)
  return res.data
}

