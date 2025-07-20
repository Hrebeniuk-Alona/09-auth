import { nextServer } from "./api";
import { Note, NewNoteContent, FetchNotesResponse } from "@/types/note";
import { User, RegisterRequest, LoginRequest, UpdateUserRequest, UserRes } from "@/types/user";
import { CheckSessionRequest } from "@/types/session";

  

export const fetchNotes = async (
  page: number = 1,
  perPage:number=12,
  search: string = "",
  tag?:string
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search !== "" && { search:search}),
      ...(tag? { tag} : {})
    },
  });
  return response.data;
};



export const createNote = async (content: NewNoteContent): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", content);
    return response.data;
};


export const deleteNote = async (id: number): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data
}


export const fetchNoteById = async (id: number):Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`)
  return res.data
}


export const register = async (payload: RegisterRequest):Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', payload)
  return res.data
}


export const login = async (payload: LoginRequest):Promise<UserRes> => {
  const res = await nextServer.post<UserRes>('/auth/login', payload)
  return res.data
}

export const checkSession = async ():Promise<CheckSessionRequest> => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session')
  return res.data
}


export const getMe = async () => {
  const { data } = await nextServer.get<UserRes>('/auth/me');
  return data;
}

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
}

export async function updateUser(payload: UpdateUserRequest): Promise<UserRes> {
  const res = await nextServer.patch<UserRes>("/users/me", payload);
  return res.data;
}