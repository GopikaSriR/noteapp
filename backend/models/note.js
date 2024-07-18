const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  labels: [{ type: String }],
  backgroundColor: { type: String, default: "#ffffff" },
  isArchived: { type: Boolean, default: false },
  isTrashed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
