
import React, { useState, useEffect } from "react";
import TagInput from "./TagInput";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const AddEditNotes = ({ note, onClose, fetchNote }) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const { user, loading } = useAuth();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags || []);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = note
        ? `http://localhost:8000/api/note/edit/${note._id}`
        : "http://localhost:8000/api/note/create";

      const method = note ? "put" : "post";

      const res = await axios({
        method,
        url,
        data: { title, content, tags },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (res.data.success) {
        toast.success(note ? "Note Updated" : "Note Created");
        fetchNote();
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
      <div className="flex flex-col gap-4 mb-6">
        <label className="input-label" htmlFor="title">
          TITLE
        </label>
        <input
          type="text"
          id="title"
          className="text-2xl text-slate-950 outline-none bg-slate-50 p-3 rounded-md w-full"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <label className="input-label" htmlFor="content">
          CONTENT
        </label>
        <textarea
          id="content"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-3 rounded-md w-full"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <label className="input-label" htmlFor="tags">
          TAGS
        </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      <button
        type="submit"
        className="py-3 px-6 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg w-full mt-4"
      >
        Save Note
      </button>
    </form>
  );
};

export default AddEditNotes;
