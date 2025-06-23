"use client";

import { useState } from 'react'
import css from "./NotesPage.module.css"
import {  fetchNotes, PaginatedNotesResponse } from '@/lib/api'
import SearchBox from '@/components/SearchBox/SearchBox'
import { keepPreviousData, useQuery} from "@tanstack/react-query"
import NoteList from '@/components/NoteList/NoteList'
import Pagination from '@/components/Pagination/Pagination'
import { useDebounce } from "use-debounce";
import { Note } from '@/types/note';
import NoteModal from '@/components/NoteModal/NoteModal'


type Props = {
  initialData: PaginatedNotesResponse;
}


const NotesClient=({initialData}:Props)=>{

  const [searchText, setSearchText] = useState("")
  const [page, setPage] = useState(1)
  const [debouncedSearchQuery] = useDebounce(searchText, 500);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const openCreateNoteModal = () => setIsNoteModalOpen(true);
  const closeCreateNoteModal = () => setIsNoteModalOpen(false);
  

  const { data, isLoading, isError } = useQuery<
    PaginatedNotesResponse
  >({
    queryKey: ['notes', page, debouncedSearchQuery],
    queryFn: () => fetchNotes(page, 12, debouncedSearchQuery),
    placeholderData: keepPreviousData,
    initialData: page === 1 && debouncedSearchQuery === '' ? initialData : undefined,
  })

  const notes: Note[] = data?.notes || [];
  const totalPage: number = data?.totalPages ?? 0;
  
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
	 
            <SearchBox value={searchText} onSubmit={handleSearch} />
          
            {notes.length > 0 && (<Pagination onClickPage={handlePageClick} pageCount={totalPage}
              currentPage={page} />)}
          
            <button className={css.button} onClick={openCreateNoteModal}>Create note +</button>
     
          </header>


          {isLoading && <p>Loading...</p>}
          {isError && <p>Something went wrong</p>}

      
          {notes.length > 0 && <NoteList notes={notes} />}

          
          {isNoteModalOpen && <NoteModal onClose={closeCreateNoteModal} />}
        </div>
      </>

    ) 

}


export default NotesClient
