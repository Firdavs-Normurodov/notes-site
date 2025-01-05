import React, { useState } from "react";
import TagInput from "./TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../utils/axios";

function AddEditNotes({
  noteData,
  type,
  onClose,
  getAllNotes,
  showToatsMessage,
}) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      await axiosInstance.post("/add-note", { title, content, tags });
      showToatsMessage("Note successfully added.", "success");
      getAllNotes();
      onClose();
    } catch (error) {
      console.log("Error adding note:", error);
      setError("Error adding note.");
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      await axiosInstance.put(`/edit-note/${noteId}`, {
        title,
        content,
        tags,
      });
      showToatsMessage("Note successfully updated.", "success");
      getAllNotes();
      onClose();
    } catch (error) {
      console.log("Error updating note:", error);
      setError("Error updating note.");
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title.");
      return;
    }
    if (!content) {
      setError("Please enter content.");
      return;
    }
    setError("");
    type === "edit" ? editNote() : addNewNote();
  };

  return (
    <div className="outline-none relative">
      <button
        className="w-10 h-10 rounded-full items-center justify-center absolute -top-3 -right-3"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400 hover:text-black" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="For example: Going to the gym at 5:00"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label className="input-label">Content</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Enter content..."
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-sm pt-5">{error}</p>}
      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
}

export default AddEditNotes;
