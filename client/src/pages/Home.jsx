// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import NoteCard from '../components/NoteCard.jsx'
import {Navbar} from '../components/Navbar.jsx'
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal'
import { AddEditNotes } from './AddEditNotes.jsx'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {EmptyCard} from '../components/EmptyCard.jsx'

export const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const { currentUser, loading, errorDispatch } = useSelector(state => state.user)

  const [userInfo, setUserInfo] = useState(null)
  const [allNotes, setAllNotes] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const [searchNotes, setSearchNotes] = useState([]) // Store search results separately

  const navigate = useNavigate()

  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: 'Add',
    data: null
  })

  useEffect(() => {
    if (currentUser === null || !currentUser) {
      navigate('/login')
    } 
    else {
      setUserInfo(currentUser?.rest)
      getAllNotes()
    }
  }, [currentUser, navigate])

  const getAllNotes = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/note/all', {
        withCredentials: true
      })
      if (!res.data || res.data.success === false) {
        console.log('Error:', res.data ? res.data.message : 'No data received')
        return
      }
      setAllNotes(res.data.notes)
      setIsSearch(false) // Reset search state
    } catch (error) {
      console.log(error, 'Error fetching notes')
    }
  }

  const onSearchNote = async (query) => {
    try {
      const res = await axios.get("http://localhost:8080/api/note/search", {
        params: { query },
        withCredentials: true,
      })

      if (res.data.success === false) {
        toast.error(res.data.message)
        console.log(res.data.message)
        return
      }

      setSearchNotes(res.data.notes) // Store search results in separate state
      setIsSearch(true) // Set to true to indicate search mode
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false) // Exit search mode // Clear search results
    getAllNotes() // Fetch all notes again
  }

  const handleEdit = (noteDetails) => {
    setOpenAddEditModel({ isShown: true, data: noteDetails, type: 'edit' })
  }

  const handleDelete = async (data) => {
    const noteId = data._id
    try {
      const res = await axios.delete(`http://localhost:8080/api/note/delete/${noteId}`, {
        withCredentials: true
      })
      if (res.data.success === false) {
        return
      }
      toast.success(res.data.message)
      getAllNotes()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      <div className='container mx-auto'>
        {(isSearch ? searchNotes : allNotes).length > 0 ? ( // Conditionally render search or all notes
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5'>
            {(isSearch ? searchNotes : allNotes).map(note => (
              <NoteCard
                key={note._id}
                title={note.title}
                data={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onDelete={() => handleDelete(note)}
                onEdit={() => handleEdit(note)}
                onPinNote={() => {}}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={
              isSearch
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtakcQoMFXwFwnlochk9fQSBkNYkO5rSyY9A&s'
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDCtZLuixBFGTqGKdWGLaSKiO3qyhW782aZA&s'
            }
            message={
              isSearch
                ? 'Oops! No Notes found matching your search'
                : `Ready to capture your ideas? Click the 'Add' button to start noting down your thoughts, inspiration, and reminders. Let's get started!`
            }
          />
        )}
      </div>

      <button
        onClick={() => {
          setOpenAddEditModel({ isShown: true, type: 'add', data: null })
        }}
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2b85ff] absolute right-10 bottom-10 text-white text-2xl hover:bg-blue-600'
      >
        <MdAdd />
      </button>

      <Modal
        isOpen={openAddEditModel.isShown}
        onRequestClose={() => {}}
        ariaHideApp={false}
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.2)' }
        }}
        className='w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'
      >
        <AddEditNotes
          onClose={() => setOpenAddEditModel({ isShown: false, type: 'add', data: null })}
          noteData={openAddEditModel.data}
          type={openAddEditModel.type}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  )
}

export default Home

