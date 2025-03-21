const booksDiv = document.querySelector('.books');
const addBookBtn = document.getElementById('add-book-btn');

// dialog&modal from mdn
const addBookDialog = document.getElementById("add-book-dialog");
const confirmBtn = addBookDialog.querySelector("#confirm-btn");
const titleInput = addBookDialog.querySelector("#title-input");
const authorInput = addBookDialog.querySelector("#author-input");
const pagesInput = addBookDialog.querySelector("#pages-input");
// const haveReadInput = addBookDialog.querySelector("#have-read-input");
const readRadioBtns = document.querySelectorAll('input[name="read"]')

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
  myLibrary.unshift(bookToAdd);
  // displayBook(bookToAdd);
}

function clearLibrary() {
  const books = document.querySelectorAll('.book');

  books.forEach(book => booksDiv.removeChild(book));
}

function displayBooks() {
  clearLibrary();
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

// // "Show the dialog" button opens the <dialog> modally
addBookBtn.addEventListener("click", () => {
  console.log(Array.from(booksDiv.children))
  addBookDialog.showModal();
});

// // Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  console.log('add book');
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  
  let haveRead;
  for (const radioBtn of readRadioBtns) {
    if (radioBtn.checked) {
      haveRead = radioBtn.value === 'yes' ? true : false;
    }
  }


  addBookToLibrary(title, author, pages, haveRead);  
  displayBooks();
  addBookDialog.close(); // Have to send the select box value here.
});

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(theHobbit.info())

addBookToLibrary('Casino Royale', 'Ian Fleming', 181, true);
// addBookToLibrary('1984', 'George Orwell', 328, false);
// addBookToLibrary('The Hobbit','J.R.R. Tolkien', 304, true);
// addBookToLibrary('And Then There Were None', 'Agatha Christie', 272, true);
// addBookToLibrary('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 223, true);
// addBookToLibrary('Along Came a Spider', 'James Patterson', 464, false);
// addBookToLibrary('The Lightning Thief', 'Rick Riordan', 377, true);

displayBooks();


console.log(myLibrary);