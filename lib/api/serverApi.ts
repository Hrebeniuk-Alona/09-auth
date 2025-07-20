// import axios from "axios";
import { cookies } from "next/headers";
// import { Note } from "@/types/note";
import { nextServer } from './api';
import { UserRes } from "@/types/user";

// export const fetchNoteById = async (id: number):Promise<Note> => {
 
//   const cookieStore = cookies().toString();

//   const res = await axios.get<Note>(`http://localhost:3000/api/notes/${id}`, {
//     headers: {
//       Cookie: cookieStore,
//     },
//     withCredentials: true,
//   });

//   return res.data;
// };




export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
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