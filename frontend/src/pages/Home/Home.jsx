
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/NoteCard";
import { GoPlus } from "react-icons/go";
import AddEditNotes from "../../components/EditNotes";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Home = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const { user, loading } = useAuth();

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/note", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (res.data.success) {
        setAllNotes(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePinNote = async (noteId, isPinned) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/note/updatePinned/${noteId}`,
        { isPinned },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.data.isPinned === true ? "Pinned" : "UnPinned");
        fetchNotes();
      }
    } catch (error) {
      console.log("Error pinning note:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/note/delete/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Note Deleted");
        setAllNotes(allNotes.filter((note) => note._id !== noteId));
      }
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleOnEdit = (note) => {
    setSelectedNote(note);
    setIsEditOpen(true);
  };

  const handleClose = () => {
    setIsEditOpen(false);
    setSelectedNote(null);
  };

  const handleSearchResults = (searchResult) => {
    setAllNotes(searchResult);
  };

  const handleNoteClick = () => {
    fetchNotes();
  };

  useEffect(() => {
    if (!loading && user) {
      fetchNotes();
    }
  }, [loading, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Sort notes: Pinned notes appear first
  const sortedNotes = [...allNotes].sort((a, b) => b.isPinned - a.isPinned);

  return (
    <>
      <Navbar
        onSearchResults={handleSearchResults}
        onNoteClick={handleNoteClick}
      />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
          {sortedNotes.map((item) => (
            <NoteCard
              key={item?._id}
              item={item}
              onEdit={() => handleOnEdit(item)}
              onPin={handlePinNote}
              onDelete={() => handleDeleteNote(item._id)}
            />
          ))}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 text-white fixed right-10 bottom-10 shadow-lg hover:bg-blue-700"
        onClick={() => setIsEditOpen(true)}
      >
        <GoPlus className="text-[32px]" />
      </button>

      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-3xl">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-red-600"
              onClick={handleClose}
            >
              <RxCross1 />
            </button>
            <AddEditNotes
              note={selectedNote}
              onClose={handleClose}
              fetchNote={fetchNotes}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
