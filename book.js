const library = [];

const pageContainer = document.querySelector(".pageContainer");
const libraryContainer = document.querySelector(".libraryContainer");
const addBookButton = document.querySelector(".add-book");
const bookTemplate = document.querySelector("#bookTemplate");

addBookButton.addEventListener("click", addBookForm);

function book(title, author, description) {
  const BOOKID = crypto.randomUUID();
  this.id = BOOKID;
  this.title = title;
  this.author = author;
  this.description = description;
}

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
    const newBook = new book(
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
  bookCard.querySelector(".title").textContent = book.title;
  bookCard.querySelector(".author").textContent = book.author;
  bookCard.querySelector(".description").textContent = book.description;
  bookCard.querySelector(".book").dataset.id = book.id;
  bookCard.querySelector(".delete-book").addEventListener("click", function () {
    const bookId = this.closest(".book").dataset.id;
    const bookIndex = library.findIndex((b) => b.id === bookId);
    if (bookIndex !== -1) {
      library.splice(bookIndex, 1);
      this.closest(".book").remove();
      console.log(`Book with ID ${bookId} removed from library.`);
    } else {
      console.error(`Book with ID ${bookId} not found in library.`);
    }
  });
  libraryContainer.appendChild(bookCard);
}
