import * as pubSub from './pubsub.js';

const notesNavigator = document.querySelector('.js-notes-navigator');
const searchInput = notesNavigator.querySelector(
  '.js-notes-navigator__search__input'
);
const noteList = notesNavigator.querySelector('.js-note-list');
const addBtn = notesNavigator.querySelector('.js-add-btn');

let notes = [];
let count = 0;

function selectNote() {
  const currentlySelected = document.querySelector('[selected]');
  if (currentlySelected != null) {
    currentlySelected.selected = false;
  }

  this.selected = true;

  const note = {
    noteId: this.noteId,
    heading: this.heading,
    body: this.text,
    tags: notes.find(
      (currentNote) => currentNote.id === parseInt(this.noteId, 10)
    ).tags,
  };

  pubSub.publish('note-selected', note);
}

function createNoteObject(headingText, bodyText, id) {
  const noteObject = document.createElement('note-object');
  noteObject.heading = headingText;
  noteObject.text = bodyText;
  noteObject.setAttribute('note-id', id);
  noteObject.addEventListener('click', selectNote);

  return noteObject;
}

function render(noteArr = [], noteListEl) {
  noteListEl.innerHTML = '';
  noteArr.forEach((note) => {
    noteList.appendChild(createNoteObject(note.heading, note.body, note.id));
  });
}

function searchNotes() {
  if (this.value.trim() === '') {
    render(notes, noteList);
    return;
  }
  const filteredNotes = notes.filter((note) =>
    note.heading.includes(this.value)
  );

  render(filteredNotes, noteList);
}

// clean this up
export function saveNote(headingText, bodyText, id, noteTags) {
  let savedNoteId = id;

  if (id === 'new') {
    const newNote = {
      heading: headingText,
      body: bodyText,
      id: count,
      tags: noteTags,
    };

    notes.push(newNote);
    savedNoteId = newNote.id;

    count++;
  } else {
    notes = notes.map((note) => {
      if (note.id === parseInt(id, 10)) {
        note.heading = headingText;
        note.body = bodyText;
      }

      return note;
    });
  }

  render(notes, noteList);

  return savedNoteId;
}

export function deleteNote(noteId) {
  notes = notes.filter((note) => note.id !== parseInt(noteId, 10));
  render(notes, noteList);
}

export function setTags(noteId, tags = []) {
  notes = notes.map((note) => {
    if (note.id === parseInt(noteId, 10)) {
      note.tags = tags;
    }

    return note;
  });
}

export function init() {
  addBtn.addEventListener('click', (event) => pubSub.publish('new-note'));
  searchInput.addEventListener('keyup', searchNotes);
}
