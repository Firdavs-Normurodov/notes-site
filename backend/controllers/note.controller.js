import Note from "../models/note.model.js";

export const addNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const userId = req.user.userId;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const note = new Note({ title, content, tags: tags || [], userId });
    await note.save();
    res.json({ error: false, note, message: "Note added successfully" });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const editNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const userId = req.user.userId;

  if (!title && !content && !tags && typeof isPinned !== "boolean") {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (typeof isPinned === "boolean") note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const getAllNotes = async (req, res) => {
  const userId = req.user.userId;

  try {
    const notes = await Note.find({ userId }).sort({ isPinned: -1 });
    return res.json({
      error: false,
      notes,
      message: "All notes retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const deleteNote = async (req, res) => {
  const noteId = req.params.noteId;
  const userId = req.user.userId;

  try {
    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    await Note.deleteOne({ _id: noteId, userId });

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const updateNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const userId = req.user.userId;

  if (typeof isPinned !== "boolean") {
    return res
      .status(400)
      .json({ error: true, message: "Invalid pinned status" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    note.isPinned = isPinned;
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note pinned status updated successfully",
    });
  } catch (error) {
    console.error("Error updating pinned status:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const searchNotes = async (req, res) => {
  const { query } = req.query;
  const userId = req.user.userId;

  if (!query) {
    return res
      .status(400)
      .json({ error: true, message: "Search query is required" });
  }

  try {
    const matchingNotes = await Note.find({
      userId,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    res.json({
      error: false,
      notes: matchingNotes,
      message: "Successfully fetched notes.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Server Error" });
  }
};
