"use client"

import { useState } from 'react'
import { fetchNotes } from '@/lib/api/clientApi'
import { FetchNotesResponse } from '@/types/note'
import { keepPreviousData, useQuery} from "@tanstack/react-query"
import { useDebounce } from "use-debounce";
import { Note } from '@/types/note';
import css from "./NotesPage.module.css"
import SearchBox from '@/components/SearchBox/SearchBox'
import NoteList from '@/components/NoteList/NoteList'
import Pagination from '@/components/Pagination/Pagination'
import Link from 'next/link';

interface Props {
  initialData: {
    notes: Note[];
    totalPages: number;
  };
  tag?: string;
}

const NotesClient=({initialData, tag}:Props)=>{

  const [searchText, setSearchText] = useState("")
  const [page, setPage] = useState(1)
  const [debouncedSearchQuery] = useDebounce(searchText, 500);
  

  const { data, isLoading, isError } = useQuery<
  FetchNotesResponse
  >({
    queryKey: ['notes', page, debouncedSearchQuery,tag],
    queryFn: () => fetchNotes(page, 12, debouncedSearchQuery, tag),
    placeholderData: keepPreviousData,
    initialData: page === 1 && debouncedSearchQuery === ''? initialData : undefined,
  })

  const notes: Note[] = data?.notes || [];
  const totalPages: number = data?.totalPages ?? 0;
  
  const handleSearch = (newQuery: string) => {
    setSearchText(newQuery);
    setPage(1);
  }

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
    return (
      <>
        <div className={css.app}>
          <header className={css.toolbar}>
	 
            <SearchBox value={searchText} onChange={handleSearch} />
          
            {notes.length > 0 && (<Pagination onClickPage={handlePageClick} pageCount={totalPages}
              currentPage={page} />)}
            
            <Link href="/notes/action/create" className={css.button}>Create note +</Link>
     
          </header>

          {isLoading && <p>Loading...</p>}
          {isError && <p>Something went wrong</p>}
      
          {notes.length > 0 && <NoteList notes={notes} />}

        </div>
      </>
    ) 
}


export default NotesClient
