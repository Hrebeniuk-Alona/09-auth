
import { cookies } from "next/headers";
import { nextServer } from './api';
import { UserRes } from "@/types/user";
import { CheckSessionRequest } from "@/types/session";
import { Note, FetchNotesResponse } from "@/types/note";

export async function fetchNotesServer(
  search: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      ...(search && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  console.log("Server Api", res.data);

  return res.data;
}


export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionRequest>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}


export async function fetchServerUser(): Promise<UserRes> {
  const cookieStore = await cookies();
  const res = await nextServer.get<UserRes>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}