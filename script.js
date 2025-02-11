// DOM Elements
const noteText = document.getElementById('note-text');
const addNoteBtn = document.getElementById('add-note');
const notesList = document.getElementById('notes-list');

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to display notes
function displayNotes() {
  notesList.innerHTML = '';
  notes.forEach((note, index) => {
    const noteItem = document.createElement('div');
    noteItem.classList.add('note-item');
    noteItem.innerHTML = `
      <p>${note}</p>
      <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
    `;
    notesList.appendChild(noteItem);
  });
}

// Function to add a new note
function addNote() {
  const text = noteText.value.trim();
  if (text !== '') {
    notes.push(text);
    localStorage.setItem('notes', JSON.stringify(notes));
    noteText.value = '';
    displayNotes();
  }
}

// Function to delete a note
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes();
}

// Event Listeners
addNoteBtn.addEventListener('click', addNote);
noteText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    addNote();
  }
});

// Initial display of notes
displayNotes();