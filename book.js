const library = [];

const pageContainer = document.querySelector(".pageContainer");
const libraryContainer = document.querySelector(".libraryContainer");
const addBookButton = document.querySelector(".add-book");
const bookTemplate = document.querySelector("#bookTemplate");

addBookButton.addEventListener("click", addBookForm);

class Book {
  constructor(title, author, description) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.description = description;
  }

  setTitle(title) {
    this.title = title;
  }
  setAuthor(author) {
    this.author = author;
  }
  setDescription(description) {
    this.description = description;
  }
  getTitle() {
    return this.title;
  }
  getAuthor() {
    return this.author;
  }
  getDescription() {
    return this.description;
  }
  getId() {
    return this.id;
  }
}

// function book(title, author, description) {
//   const BOOKID = crypto.randomUUID();
//   this.id = BOOKID;
//   this.title = title;
//   this.author = author;
//   this.description = description;
// }

function addBookForm() {
  const formElement = document.createElement("form");
  formElement.classList.add("book-form");

  formElement.innerHTML = `
    <input type="text" name="title" placeholder="Book Title" required />
    <input type="text" name="author" placeholder="Author" required />
    <textarea name="description" placeholder="Description" required></textarea>
    <button type="submit">Submit</button>
  `;

  formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(formElement);
    const newBook = new Book(
      formData.get("title"),
      formData.get("author"),
      formData.get("description")
    );
    library.push(newBook);
    addBookCard(newBook);

    console.log("New book added:", newBook);
    console.log("Current library:", library);
    console.log(library[0]);
    formElement.reset();
    formElement.remove();
  });

  pageContainer.appendChild(formElement);
  //TODO: Hide the add book button when the form is displayed

  //TODO: show the add book button when the form is submitted
}

function addBookCard(book) {
  const bookCard = bookTemplate.content.cloneNode(true);
  bookCard.querySelector(".title").textContent = book.getTitle();
  bookCard.querySelector(".author").textContent = book.getAuthor();
  bookCard.querySelector(".description").textContent = book.getDescription();
  bookCard.querySelector(".book").dataset.id = book.getId();
  bookCard.querySelector(".book").addEventListener("click", function () {
    deleteBook(book);
  });
  libraryContainer.appendChild(bookCard);
}

function populateLibrary() {
  library.forEach((book) => {
    addBookCard(book);
  });
}

function deleteBook(book) {
  let bookIndex = library.findIndex((b) => b.getId() === book.getId());
  library.splice(bookIndex, 1);
  const bookCard = libraryContainer.querySelector(
    `.book[data-id="${book.getId()}"]`
  );
  if (bookCard) {
    bookCard.remove();
  }
}
