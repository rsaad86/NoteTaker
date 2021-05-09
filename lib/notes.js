const fs = require("fs");
const path = require("path");

//return boolean based on note validity
function validateNote(note) {
  //Check a note for a title and text and ensure both are strings
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  if (isNaN(note.id)) {
    return false;
  }

  return true;
}

//Write a new note to our database file
function addNewNote(noteArray, note) {
  //Add the note into the given array
  noteArray.push(note);

  //Write the new array to our database file
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notes: noteArray }, null, 2)
  );

  return note;
}

//Return a note based on the id supplied
function findNoteById(noteArray, id) {
  //Iterate through the array and find a matching id and return it
  for (var i = 0; i < noteArray.length; i++) {
    if (noteArray[i].id == Number(id)) {
      return noteArray[i];
    }
  }

  return false;
}

function removeNote(noteArray, id) {
  //Filter out the note corresponding to the supplied id from the given array
  for (var i = 0; i < noteArray.length; i++) {
    if (noteArray[i].id === Number(id)) {
      noteArray.splice(i, 1);
    }
  }

  //Write the new array to our database file
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notes: noteArray }, null, 2)
  );
}

module.exports = { validateNote, addNewNote, findNoteById, removeNote };
