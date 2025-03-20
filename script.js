const booksDiv = document.querySelector('.books');
const myLibrary = [];

function Book(title, author, pages, haveRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.id = crypto.randomUUID();
  this.info = function() {
    return `${this.title} by ${this.author}, ${pages} pages, ${haveRead ? 'read' : 'not read'}`;
  }
}

function addBookToLibrary(title, author, pages, haveRead) {
  const bookToAdd = new Book(title, author, pages, haveRead);
  myLibrary.push(bookToAdd);
}

function displayBooks() {
  myLibrary.forEach((item) => {
    const div = document.createElement('div');
    const pTitle = document.createElement('p');
    const pAuthor = document.createElement('p');
    const pNumPages = document.createElement('p');
    const pHaveRead = document.createElement('p');
    
    div.className = 'book';
    pTitle.className = 'title';
    pAuthor.className = 'author';
    pNumPages.className = 'pages';
    pHaveRead.className = 'read';
    
    pTitle.textContent = item.title;
    pAuthor.textContent = item.author;
    pNumPages.textContent = item.pages;
    pHaveRead.textContent = item.haveRead ? 'read' : 'not read';
    
    div.appendChild(pTitle);
    div.appendChild(pAuthor);
    div.appendChild(pNumPages);
    div.appendChild(pHaveRead);
    
    booksDiv.appendChild(div);
  });
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(theHobbit.info())

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);

addBookToLibrary('Casino Royale', 'Ian Fleming', 181, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('The Hobbit','J.R.R. Tolkien', 304, true);
addBookToLibrary('And Then There Were None', 'Agatha Christie', 272, true);
addBookToLibrary('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 223, true);
addBookToLibrary('Along Came a Spider', 'James Patterson', 464, false);
addBookToLibrary('The Lightning Thief', 'Rick Riordan', 377, true);

displayBooks();


console.log(myLibrary);


// const addBookBtn = document.getElementById('add-book-btn');

// dialog&modal from mdn
// const favDialog = document.getElementById("favDialog");
// const confirmBtn = favDialog.querySelector("#confirmBtn");
// const titleInput = favDialog.querySelector("#title-input");
// const authorInput = favDialog.querySelector("#author-input");
// const pagesInput = favDialog.querySelector("#pages-input");
// const haveReadInput = favDialog.querySelector("#have-read-input");

// // "Show the dialog" button opens the <dialog> modally
// addBookBtn.addEventListener("click", () => {
//   favDialog.showModal();
// });

// // Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
// confirmBtn.addEventListener("click", (event) => {
//   event.preventDefault(); // We don't want to submit this fake form
//   const title = titleInput.value;
//   const author = authorInput.value;
//   const pages = pagesInput.value;
//   // const haveRead = haveReadInput.value;
//   addToLibrary(title, author, pages, false);  
//   updateUI();
//   favDialog.close(); // Have to send the select box value here.
// });