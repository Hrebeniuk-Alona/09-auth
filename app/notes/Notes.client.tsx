"use client";

import { useState } from 'react'
import css from "./NotesPage.module.css"
import {  fetchNotes, PaginatedNotesResponse } from '@/lib/api'
import SearchBox from '@/components/SearchBox/SearchBox'
import { keepPreviousData, useQuery} from "@tanstack/react-query"
import NoteList from '@/components/NoteList/NoteList'
import Pagination from '@/components/Pagination/Pagination'
import { useDebounce } from "use-debounce";
import { Note } from '@/type/note';
import NoteModal from '@/components/NoteModal/NoteModal'



const NotesClient=()=>{

  const [currentSearchQuery, setCurrentSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [debouncedSearchQuery] = useDebounce(currentSearchQuery, 500);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const openCreateNoteModal = () => setIsNoteModalOpen(true);
  const closeCreateNoteModal = () => setIsNoteModalOpen(false);
  

  const handleSearch = async (newQuery: string) => {
    setCurrentSearchQuery(newQuery);
    setCurrentPage(1);
  }
 

  const { data, isLoading, isError } = useQuery<
    PaginatedNotesResponse
  >({
    queryKey: ['notes', currentPage, debouncedSearchQuery],
    queryFn: () => fetchNotes(currentPage, 12, debouncedSearchQuery),
    enabled: true,
    placeholderData: keepPreviousData,
  })

  const notes: Note[] = data?.notes || [];
  const totalPage:number = data?.totalPages ?? 0;



  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


    return (
      <>
        <div className={css.app}>
          <header className={css.toolbar}>
	 
            <SearchBox value={currentSearchQuery} onSubmit={handleSearch} />
          
            {notes.length > 0 && (<Pagination onClickPage={handlePageClick} pageCount={totalPage}
              currentPage={currentPage} />)}
          
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
