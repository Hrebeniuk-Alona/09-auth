import { api } from "../api";
import { NextResponse, NextRequest } from "next/server";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";
import { cookies } from 'next/headers';


export async function GET(request: NextRequest) {

  try {
      const cookieStore = await cookies();
      const page = Number(request.nextUrl.searchParams.get('page')??1);
    const search = request.nextUrl.searchParams.get('search')??'';
     const rawTag = request.nextUrl.searchParams.get('tag') ?? '';
    const tag = rawTag === 'All' ? '' : rawTag;


    const { data } = await api('/notes', {
        params: {
            page,
            perPage: 12,
            ...(search !== "" && { search: search }),
            ...(tag && { tag }),
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
        
     return NextResponse.json(data, { status: data.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

   

   
  
    

export async function POST(request: NextRequest) {
  try {
      const cookieStore = await cookies();
        const body = await request.json();

    const { data } = await api.post('/notes', body, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
      },
    });
        
     return NextResponse.json(data, { status: data.status })
    } catch  (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
    
}