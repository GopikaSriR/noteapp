const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, labels, backgroundColor } = req.body;

  const note = new Note({
    user: req.user._id,
    title,
    content,
    labels,
    backgroundColor,
  });

  const createdNote = await note.save();
  res.status(201).json(createdNote);
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, labels, backgroundColor } = req.body;

  const note = await Note.findById(req.params.id);

  if (note) {
    note.title = title;
    note.content = content;
    note.labels = labels;
    note.backgroundColor = backgroundColor;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    await note.remove();
    res.json({ message: "Note removed" });
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

module.exports = { getNotes, createNote, updateNote, deleteNote };
