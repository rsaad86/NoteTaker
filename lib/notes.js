const fs = require("fs");
const path = require("path");

//True or False validation
function validateNote(note) {
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

//This function takes care of the note writing
function addNewNote(noteArray, note) {
  //Add note into the array
  noteArray.push(note);

  //Write to the database file (new array)
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
      console.log(noteArray);
      noteArray.splice(i, 1);
      console.log(noteArray);
    }
  }

  //Write the new array to our database file
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notes: noteArray }, null, 2)
  );
}

module.exports = { validateNote, addNewNote, findNoteById, removeNote };
