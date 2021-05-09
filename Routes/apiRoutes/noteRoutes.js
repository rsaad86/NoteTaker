const express = require("express");
const router = express.Router();
const { notes } = require("../../db/db.json");
const {
  validateNote,
  addNewNote,
  findNoteById,
  removeNote,
} = require("../../lib/notes.js");

//initialize the note id counter
//if there are saved notes then we set the counter to the highest id + 1 which will always be the last note
//if there are no saved notes then we set the counter to 0
let noteId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;

//Respond with all notes in JSON format
router.get("/notes", (req, res) => {
  res.json(notes);
});

//Add a new note to the db file after validating the entry
router.post("/notes", (req, res) => {
  const note = req.body;

  //assign the note id
  note.id = noteId;

  if (validateNote(note)) {
    //add the note to the notes array for writing
    const addedNote = addNewNote(notes, note);

    //increment the note id if the note has been validated.
    noteId++;

    res.json(addedNote);
  } else {
    res.status(400).json({ error: "Please enter a valid note!" });
  }
});

router.delete("/notes/:id", (req, res) => {
  const note = findNoteById(notes, req.params.id);

  if (note) {
    //Delete note only if it is found
    removeNote(notes, req.params.id);
    res.json({ removed: note, data: notes });
  } else {
    //If there is no note, error message appears
    res.status(404).json({ error: "Error: Note was not found." });
  }
});

module.exports = router;
