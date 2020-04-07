import * as pubSub from './pubsub.js';

const notepad = document.querySelector('.js-notepad');
const noteTitleInput = document.querySelector('.js-note-title');
const scratchpad = notepad.querySelector('.js-scratchpad');
const toolbar = notepad.querySelector('.js-toolbar');
const saveBtn = toolbar.querySelector('.js-save-btn');
const clearBtn = toolbar.querySelector('.js-clear-btn');
const deleteBtn = toolbar.querySelector('.js-delete-note-btn');

let _noteId = 'new';

function saveNote() {
  const note = {
    heading: noteTitleInput.value,
    body: scratchpad.value,
    noteId: _noteId,
  };
  // update note-object
  pubSub.publish('note-saved', note);
  // notesNavigator.saveNote(heading, note, noteId);
}

export function setNote(headerText, bodyText, noteId) {
  noteTitleInput.value = headerText;
  scratchpad.value = bodyText;
  _noteId = noteId;
}

export function setNoteId(noteId) {
  _noteId = noteId;
}

export function clear() {
  noteTitleInput.value = '';
  scratchpad.value = '';
}

export function newNote() {
  _noteId = 'new';
}

function deleteNote() {
  const id = _noteId;
  pubSub.publish('note-deleted', id);
  clear();
  newNote();
}
export function getNoteId() {
  return _noteId;
}

export function init() {
  saveBtn.addEventListener('click', saveNote);
  clearBtn.addEventListener('click', clear);
  deleteBtn.addEventListener('click', deleteNote);
  // notepad.addEventListener('noteSelected', setNote);
}
