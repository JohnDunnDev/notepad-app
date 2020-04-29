// App v0.1, JS v0.2
// Declare elements
const container = document.getElementById('container');
const sidebar = document.getElementById('sidebar');
const notesList = document.getElementById('notes-list');
const notesItems = document.getElementsByClassName('notes-item');
const inputArea = document.getElementById('input-area');

var currentNoteName = '';
var currentNoteText = '';
var defaultStr = 'Write your note here.';

inputArea.innerHTML = currentNoteText;

// Check local storage for existing notes and populate list
if (localStorage.length > 0) {
  for (let i = localStorage.length; i > -1; i--) {
    const newNote = document.createElement('li');
    newNote.innerText = localStorage.key(i);
    newNote.classList.add('notes-item');
    newNote.setAttribute("onclick", "selectNote()");

    notesList.appendChild(newNote);
  }
} else {
  const newNote = document.createElement('li');
  newNote.innerText = 'New note';
  newNote.classList.add('notes-item');
  newNote.classList.add('notes-item-selected');
  
  notesList.appendChild(newNote);
  
  localStorage.setItem('New note', defaultStr);
  currentNoteName = 'New note';
  currentNoteText = localStorage.getItem(currentNoteName);
  
  inputArea.innerHTML = defaultStr;
}

// Button variables and event listeners

// Delete/create/save note
const deleteButton = document.getElementById('delete-note-btn');
deleteButton.addEventListener('click', deleteNote);

const createButton = document.getElementById('create-note-btn');
createButton.addEventListener('click', createNote);

const saveButton = document.getElementById('save-note-btn');
saveButton.addEventListener('click', saveNote);

// Dark mode
const darkModeOnButton = document.getElementById('dark-mode-on-btn');
darkModeOnButton.addEventListener('click', darkModeToggle);

const darkModeOffButton = document.getElementById('dark-mode-off-btn');
darkModeOffButton.addEventListener('click', darkModeToggle);
// Hide darkModeOffButton on load
darkModeOffButton.classList.add('btn-hide');

var darkModeStatus = false;

// Minimise and maximise
const minimiseButton = document.getElementById('minimise-btn');
minimiseButton.addEventListener('click', hideSidebar);

const maximiseButton = document.getElementById('maximise-btn');
maximiseButton.addEventListener('click', hideSidebar);
// Hide maximiseButton on load
maximiseButton.classList.add('btn-hide');

var minimiseStatus = false;

// Event listener for ctrl +
document.addEventListener('keydown', function(event) {
  // Listen for Ctrl key
  if (event.ctrlKey) {
    if (event.keyCode == 68) {
      // Ctrl + D key
      deleteNote();
        } 
    else if (event.keyCode == 78) {
      // Ctrl + N key
      createNote();
        }
    else if (event.keyCode == 83) {
      // Ctrl + S key
      saveNote();
        }
    else if (event.keyCode == 77) {
      // Ctrl + M key
      hideSidebar();
        }
  } 
  // Listen for Alt key
  else if (event.altKey) {
    if (event.keyCode == 68) {
      // Alt + D key
        darkModeToggle();
        }
    else {
      return;
    }
             }
  else {
    // If key isn't Ctrl or Alt, do nothing
    return;
  }
});

// Toolbar functionality

function deleteNote() {
  let deleteConfirmation = confirm('Are you sure you would like to delete this note?');
  
  if (deleteConfirmation) {
    // Remove from local storage
  localStorage.removeItem(currentNoteName);
  // Remove from list
  let liToDelete = document.querySelector('.notes-item-selected');
  notesList.removeChild(liToDelete);

  currentNoteName = '';
  currentNoteText = '';
  } else {
    return;
  }
};

function createNote() {
  // Save current note first
  saveNote();
  // Create new note
  let newNoteName = prompt('Enter a title', 'New note');
  if (newNoteName == null || newNoteName == '') {
    alert('New note name cannot be blank');
    saveNote();
  } else {
    // Remove selected class from previous note
    for (let i = 0; i < notesItems.length; i++) {
      notesItems[i].classList.remove('notes-item-selected');
    }
    // Create new note in list
    const newNote = document.createElement('li');
    newNote.innerText = newNoteName;
    newNote.classList.add('notes-item' + 'notes-item-selected');
    newNote.setAttribute("onclick", "selectNote()");
    
    notesList.appendChild(newNote);
    
    // Create item in local storage and set 'current' variables
    localStorage.setItem(newNoteName, defaultStr);
    currentNoteName = newNoteName;
    currentNoteText = localStorage.getItem(currentNoteName);
    
    inputArea.innerHTML = defaultStr;
  }
};

function saveNote() {
  // Check if current text is different from local storage before prompt
  if (inputArea.innerHTML !== localStorage.getItem(currentNoteName)) {
    let saveConfirmation = confirm('Save current note?');
    if (saveConfirmation) {
      localStorage.currentNoteName = inputArea.innerHTML;
    } else {
      return;
    }
  }
  else {
    return;
  }
};

function darkModeToggle() {
  if (darkModeStatus) {
    darkModeStatus = false;
    darkModeOffButton.classList.add('btn-hide');
    darkModeOnButton.classList.remove('btn-hide');
    container.classList.remove('darkMode');
  } else {
    darkModeStatus = true;
    darkModeOffButton.classList.remove('btn-hide');
    darkModeOnButton.classList.add('btn-hide');
    container.classList.add('darkMode');
  }
};

function hideSidebar() {
  if (minimiseStatus) {
    minimiseStatus = false;
    
    sidebar.classList.remove('sidebar-hide')
    notesList.classList.remove('notes-list-hide');
    input.classList.remove('enlarge-input-area')
    
    // Hide maximise btn and show minimise
    maximiseButton.classList.add('btn-hide');
    
    minimiseButton.classList.remove('btn-hide');
  } 
  
  else {
    minimiseStatus = true;
    
    sidebar.classList.add('sidebar-hide');
    notesList.classList.add('notes-list-hide');
    input.classList.add('enlarge-input-area');
    
    // Hide minimise btn and show maximise
    minimiseButton.classList.add('btn-hide');
    
    maximiseButton.classList.remove('btn-hide');
  }
}

// handle picking new note
function selectNote() {
  // Check if user wants to save current note first
  saveNote();
  // Remove 'selected' class from old note then add to current
  for (let i = 0; i < notesItems.length; i++) {
    notesItems[i].classList.remove('notes-item-selected');
  };

  let selectedNote = event.target;
  selectedNote.classList.add('notes-item-selected');
  // Select and display note from local storage
  currentNoteName = event.target.innerText;
  currentNoteText = localStorage.getItem(currentNoteName);
  inputArea.innerHTML = currentNoteText;
};