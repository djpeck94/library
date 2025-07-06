const library = [];

const libraryContainer = document.querySelector(".libraryContainer");
const addBookButton = document.querySelector(".add-book");

addBookButton.addEventListener("click", addBookForm);

function book(title, author, description) {
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

  libraryContainer.appendChild(formElement);
  //TODO: Hide the add book button when the form is displayed

  //TODO: show the add book button when the form is submitted
}

function addBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book");

  bookCard.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>${book.description}</p>
  `;

  libraryContainer.appendChild(bookCard);
}
