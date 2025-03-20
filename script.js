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
    return `${this.title} by ${this.author}, ${pages} pages, ${haveRead ? 'read' : 'not read yet'}`;
  }
}

function addBookToLibrary(title, author, pages, haveRead) {
  const book = new Book(title, author, pages, haveRead);
  myLibrary.push(book);
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(theHobbit.info())

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(myLibrary);
