import * as notesNavigator from './modules/notesNavigator.js';
import * as notepad from './modules/notepad.js';
import * as tagger from './modules/tagger.js';
import * as pubSub from './modules/pubsub.js';

const searchInput = document.querySelector('.js-search-input');

notesNavigator.init();
notepad.init();
tagger.init();

function noteSaved(note) {
  const noteId = notesNavigator.saveNote(
    note.heading,
    note.body,
    note.noteId,
    tagger.getTags()
  );

  notepad.setNoteId(noteId);
}

function newNote() {
  notepad.clear();
  notepad.newNote();
  tagger.setTags([]);
}

function noteSelected(note) {
  notepad.setNote(note.heading, note.body, note.noteId);
  tagger.setTags(note.tags);
}

function tagAdded(tags) {
  notesNavigator.setTags(notepad.getNoteId, tags);
}

function noteDeleted(id) {
  notesNavigator.deleteNote(id);
}

pubSub.subscribe('note-saved', noteSaved);
pubSub.subscribe('new-note', newNote);
pubSub.subscribe('note-selected', noteSelected);
pubSub.subscribe('tag-added', tagAdded);
pubSub.subscribe('note-deleted', noteDeleted);
searchInput.addEventListener('keyup', function () {
  const input = this;
  if (input.value.length === 0) {
    input.classList.add('search-input--empty');
  } else {
    input.classList.remove('search-input--empty');
  }
});
