let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${title} by ${author}, ${pages} pages, ${
      read ? "read" : "not read yet"
    }`;
  };
  this.changeReadStatus = () => {
    this.read = this.read ? false : true;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

let libraryTable = document.querySelector("#library");

function displayBooks() {
  let libraryElement = document.querySelector("#library");
  while (libraryElement.childElementCount > 1) {
    libraryElement.removeChild(libraryElement.lastElementChild);
  }
  for (let book of myLibrary) {
    let bookElement = document.createElement("tr");
    bookElement.setAttribute("class", "bookElement");
    bookElement.setAttribute("id", myLibrary.indexOf(book));
    for (let prop in book) {
      if (typeof book[prop] === "function") continue;
      let propElement = document.createElement("td");
      propElement.textContent = book[prop];
      bookElement.appendChild(propElement);
    }
    let changeReadBtn = document.createElement("button");
    changeReadBtn.setAttribute("class", "changeReadBtn");
    changeReadBtn.setAttribute("id", myLibrary.indexOf(book));
    changeReadBtn.textContent = "change read status";
    bookElement.appendChild(changeReadBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "deleteBtn");
    deleteBtn.setAttribute("id", myLibrary.indexOf(book));
    deleteBtn.textContent = "delete";
    bookElement.appendChild(deleteBtn);

    libraryElement.appendChild(bookElement);
  }
  let changeReadBtns = document.querySelectorAll(".changeReadBtn");
  changeReadBtns.forEach((changeReadBtn) =>
    changeReadBtn.addEventListener("click", () => {
      myLibrary[changeReadBtn.id].changeReadStatus();
      displayBooks();
    })
  );

  let deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((deleteBtn) =>
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(deleteBtn.id, 1);
      displayBooks();
    })
  );
}

let hp = new Book("Harry Potter", "J.K. Rowling", 400, true);

let it = new Book("IT", "Stephen King", 321, false);

let outliers = new Book("Outliers", "Malcolm Gladwell", 395, true);

addBookToLibrary(hp);
addBookToLibrary(it);
addBookToLibrary(outliers);

displayBooks();

let container = document.querySelector("#container");

let newBookBtn = document.querySelector("#newBookBtn");
newBookBtn.addEventListener("click", () => {
  newBookBtn.disabled = true;
  let formElement = document.createElement("form");
  formElement.setAttribute("id", "formElement");
  let book = new Book();
  for (let prop in book) {
    if (typeof book[prop] === "function") continue;
    if (prop === "read") {
      let radioFormElement = document.createElement("form");
      let trueRadioBtn = document.createElement("input");
      trueRadioBtn.setAttribute("type", "radio");
      trueRadioBtn.setAttribute("id", "true");
      trueRadioBtn.setAttribute("name", "read");
      trueRadioBtn.setAttribute("value", "true");
      trueRadioBtn.setAttribute("checked", "true");

      let trueRadioLabel = document.createElement("label");
      trueRadioLabel.setAttribute("for", "true");
      trueRadioLabel.textContent = "read";

      let falseRadioBtn = document.createElement("input");
      falseRadioBtn.setAttribute("type", "radio");
      falseRadioBtn.setAttribute("id", "false");
      falseRadioBtn.setAttribute("name", "read");
      falseRadioBtn.setAttribute("value", "false");
      let falseRadioLabel = document.createElement("label");
      falseRadioLabel.setAttribute("for", "false");
      falseRadioLabel.textContent = "not read";

      formElement.appendChild(trueRadioBtn);
      formElement.appendChild(trueRadioLabel);
      formElement.appendChild(falseRadioBtn);
      formElement.appendChild(falseRadioLabel);
      formElement.appendChild(document.createElement("br"));
    } else {
      let labelElement = document.createElement("label");
      labelElement.setAttribute("for", prop);
      labelElement.textContent = `${prop}: `;
      let inputElement = document.createElement("input");
      inputElement.setAttribute("type", "text");
      inputElement.setAttribute("id", prop);
      inputElement.setAttribute("name", prop);
      formElement.appendChild(labelElement);
      formElement.appendChild(document.createElement("br"));
      formElement.appendChild(inputElement);
      formElement.appendChild(document.createElement("br"));
    }
  }
  let addBtn = document.createElement("button");
  addBtn.setAttribute("id", "addBtn");
  addBtn.textContent = "ADD";
  let formContainer = document.createElement("div");
  formContainer.setAttribute("id", "form-container");
  formContainer.appendChild(formElement);
  formContainer.appendChild(addBtn);
  container.appendChild(formContainer);

  addBtn.addEventListener("click", () => {
    let bookFields = formElement.querySelectorAll("input");
    let [title, author, pages] = [
      bookFields[0].value,
      bookFields[1].value,
      bookFields[2].value,
    ];
    let read = bookFields[3].checked ? true : false;
    let newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    displayBooks();
    container.removeChild(formContainer);
    newBookBtn.disabled = false;
  });
});
