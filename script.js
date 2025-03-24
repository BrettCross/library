const booksDiv = document.querySelector('.books');
const addBookBtn = document.getElementById('add-book-btn');

// dialog&modal from mdn
// const addBookDialog = document.getElementById("add-book-dialog");
const modal = document.getElementById("modal");
const closeSpan = document.getElementById("close-span");
const addBookForm = document.getElementById("add-book-form");
const confirmBtn = modal.querySelector("#confirm-btn");
const titleInput = modal.querySelector("#title-input");
const authorInput = modal.querySelector("#author-input");
const pagesInput = modal.querySelector("#pages-input");
const haveReadInput = modal.querySelector("#have-read-input");
// const readRadioBtns = document.querySelectorAll('input[name="read"]')

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

Book.prototype.changeStatus = function() {
  this.haveRead = !this.haveRead;
}

function addBookToLibrary(title, author, pages, haveRead) {
  const bookToAdd = new Book(title, author, pages, haveRead);
  myLibrary.unshift(bookToAdd);
}

function removeBookFromLibrary(book) {
  // remove book from library array
  const foundIndex = myLibrary.findIndex((element) => element === book);
  const removed = myLibrary.splice(foundIndex, 1);
  console.log('from remove', removed);
  console.log(myLibrary);
  return removed;
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
    const divDelete = document.createElement('div');
    const divStatus = document.createElement('div');
    const inputStatus = document.createElement('input');
    const labelStatus = document.createElement('label');
    
    div.className = 'book';
    pTitle.className = 'title';
    pAuthor.className = 'author';
    pNumPages.className = 'pages';
    pHaveRead.className = 'read';
    divDelete.className = 'delete';
    divStatus.className = 'status';
    
    inputStatus.type = 'checkbox';
    
    pTitle.textContent = item.title;
    pAuthor.textContent = item.author;
    pNumPages.textContent = item.pages + ' pgs';
    // pHaveRead.textContent = item.haveRead ? 'read' : 'not read';
    labelStatus.textContent = item.haveRead ? 'read' : 'not read';
    inputStatus.checked = item.haveRead;
    divDelete.textContent = 'X';
    divStatus.appendChild(inputStatus);

    divStatus.appendChild(labelStatus);
    
    div.appendChild(pTitle);
    div.appendChild(pAuthor);
    div.appendChild(pNumPages);
    div.appendChild(pHaveRead);
    div.appendChild(divStatus);
    div.appendChild(divDelete);
    
    booksDiv.appendChild(div);
    
    divDelete.addEventListener('click', () => {
      // remove item from library
      // update display
      console.log('from event listener', item.id);
      removeBookFromLibrary(item);
      displayBooks();
    });

    inputStatus.addEventListener('click', () => {
      item.changeStatus();
      labelStatus.textContent = item.haveRead ? 'read' : 'not read';
    });
  });
}

// function removeBookFromDisplay(book) {
//   return;
// }

// // "Show the dialog" button opens the <dialog> modally
addBookBtn.addEventListener("click", () => {
  console.log(Array.from(booksDiv.children))
  // addBoodDialog.showModal();
  modal.style.display = "block";
});

closeSpan.addEventListener("click", () => {
  modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

// // Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault(); // We don't want to submit this fake form
  if (addBookForm.checkValidity()) {
    console.log('add book');
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const haveRead = haveReadInput.checked;
    // let haveRead;
    // for (const radioBtn of readRadioBtns) {
    //   if (radioBtn.checked) {
    //     haveRead = radioBtn.value === 'yes' ? true : false;
    //   }
    // }

    addBookToLibrary(title, author, pages, haveRead);  
    displayBooks();
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    haveReadInput.checked = false;
  } else {
    addBookForm.reportValidity();
  }

  // console.log('add book');
  // const title = titleInput.value;
  // const author = authorInput.value;
  // const pages = pagesInput.value;
  // const haveRead = haveReadInput.checked;
  // // let haveRead;
  // // for (const radioBtn of readRadioBtns) {
  // //   if (radioBtn.checked) {
  // //     haveRead = radioBtn.value === 'yes' ? true : false;
  // //   }
  // // }

  // addBookToLibrary(title, author, pages, haveRead);  
  // displayBooks();
  // titleInput.value = '';
  // authorInput.value = '';
  // pagesInput.value = '';
  // haveReadInput.checked = false;
  // modal.close(); // Have to send the select box value here.
});

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(theHobbit.info())
theHobbit.changeStatus();
console.log(theHobbit.haveRead);
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