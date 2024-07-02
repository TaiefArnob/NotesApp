const notesContainer = document.querySelector('.notesContainer');
const createBtn = document.querySelector('.btn');

// Function to show notes from localStorage
function showNotes() {
    const notesHTML = localStorage.getItem('notes');
    if (notesHTML) {
        notesContainer.innerHTML = notesHTML;
    }
}

// Function to update localStorage
function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

// Load and display notes when the page loads
showNotes();

// Function to handle keydown event for Enter key
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        document.execCommand('insertLineBreak');
        event.preventDefault();
    }
}

// Add a new note when the create button is clicked
createBtn.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = 'inputBox';
    inputBox.setAttribute('contenteditable', 'true');
    img.src = 'images/delete.png';
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    updateStorage();

    // Attach event listeners to the new inputBox
    inputBox.addEventListener('keyup', updateStorage);
    inputBox.addEventListener('keydown', handleEnterKey);
});

// Event delegation to handle clicks on delete images and editing notes
notesContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === 'P' && e.target.classList.contains('inputBox')) {
        e.target.addEventListener('keyup', updateStorage);
        e.target.addEventListener('keydown', handleEnterKey);
    }
});

// Attach keydown event listener to existing notes
notesContainer.querySelectorAll('.inputBox').forEach(inputBox => {
    inputBox.addEventListener('keydown', handleEnterKey);
});
