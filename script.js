function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
  this.info = function () {
    let suffix = "";
    if (this.read === true) {
      suffix = "has been read";
    } else {
      suffix = "not read yet";
    }
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${suffix}`
    );
    return `${this.title} by ${this.author}, ${this.pages} pages, ${suffix}`;
  };
}

const myLibrary = [];

const bookButton = document.querySelector("#bookButton");
const form = document.querySelector("#form");
const inputFields = document.querySelectorAll("input");
const select = document.forms["myForm"].elements["mySelect"];
const tbody = document.querySelector("#tbody");

function checkForm() {
  let allFilled = true;
  inputFields.forEach(function (input) {
    if (input.value.trim() === "") {
      allFilled = false;
    }
  });
  bookButton.disabled = !allFilled;
}

inputFields.forEach(function (input) {
  input.addEventListener("input", checkForm);
});

bookButton.disabled = true;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let bookValuesArray = [];
  inputFields.forEach(function (input) {
    bookValuesArray.push(input.value);
  });
  bookValuesArray.push(select.value);
  myLibrary.push(new Book(...bookValuesArray));

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  myLibrary.forEach(function (object) {
    let tr = document.createElement("tr");
    for (let count = 0; count < 7; count++) {
      let td = document.createElement("td");
      if (count === 0) {
        td.textContent = myLibrary.indexOf(object) + 1;
        tr.appendChild(td);
      } else if (count === 1) {
        td.textContent = object.title;
        tr.appendChild(td);
      } else if (count === 2) {
        td.textContent = object.author;
        tr.appendChild(td);
      } else if (count === 3) {
        td.textContent = object.pages;
        tr.appendChild(td);
      } else if (count === 4) {
        if (object.read === true) {
          td.textContent = "Yeah, I've read it";
        } else {
          td.textContent = "Nope, haven't read it";
        }
        tr.appendChild(td);
      } else if (count === 5) {
        let readQuestionButton = document.createElement("button");
        readQuestionButton.textContent = "Read";
        // readQuestionButton.classList.add("readQuestionButton");
        readQuestionButton.addEventListener("click", function (event) {
          let removeThis = event.target.parentElement.parentElement;
          let removeThisNumber = Number(removeThis.firstChild.textContent) - 1;
          myLibrary[removeThisNumber].read = !myLibrary[removeThisNumber].read;
          if (myLibrary[removeThisNumber].read === true) {
            removeThis.childNodes[4].textContent = "Yeah, I've read it";
          } else {
            removeThis.childNodes[4].textContent = "Nope, haven't read it";
          }
        });
        td.appendChild(readQuestionButton);
        tr.appendChild(td);
      } else {
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        // removeButton.classList.add("removeButton");
        removeButton.addEventListener("click", function (event) {
          let removeThis = event.target.parentElement.parentElement;
          let removeThisNumber = Number(removeThis.firstChild.textContent);
          myLibrary.splice(removeThisNumber - 1, 1);
          tbody.removeChild(removeThis);
          tbody.childNodes.forEach(function (child) {
            child.firstChild.textContent =
              Array.from(tbody.childNodes).indexOf(child) + 1;
          });
          console.log(myLibrary);
        });
        td.appendChild(removeButton);
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });
});
