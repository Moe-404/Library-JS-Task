class Author {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

class Book {
    constructor(name, price, author) {
        this.name = name;
        this.price = price;
        this.author = author;
    }
}

let books = [];
let totalBooks = 0;
let bookCount = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("bookForm").style.display = "none";
    document.getElementById("bookTable").style.display = "none";
    document.getElementById("bookCountForm").addEventListener("submit", setBookCount);
    document.getElementById("bookForm").addEventListener("submit", addBook);
});

function setBookCount(event) {
    event.preventDefault();
    totalBooks = parseInt(document.getElementById("totalBooks").value);
    if (isNaN(totalBooks) || totalBooks <= 0) {
        alert("Please enter a valid number of books.");
        return;
    }
    document.getElementById("bookCountForm").style.display = "none";
    document.getElementById("bookForm").style.display = "block";
}

function bookNameCheck(name) {
    const regex = /^[A-Za-z\s]+$/;
    const isValid = name.match(regex);
    if (!isValid) {
        return false;
    }
    return true;
}

function priceCheck(price) {
    const isValid = !isNaN(price) && price > 0;
    if (!isValid) {
        return false;
    }
    return true;
}

function authorNameCheck(name) {
    const regex = /^[A-Za-z\s]+$/;
    const isValid = name.match(regex);
    if (!isValid) {
        return false;
    }
    return true;
}

function emailCheck(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = email.match(regex);
    if (!isValid) {
        return false;
    }
    return true;
}

function addBook(event) {
    event.preventDefault();
    let bookName = document.getElementById("bookName").value;
    let bookPrice = document.getElementById("bookPrice").value;
    let authorName = document.getElementById("authorName").value;
    let authorEmail = document.getElementById("authorEmail").value;

    if (!bookNameCheck(bookName) && !priceCheck(bookPrice) && !authorNameCheck(authorName) && !emailCheck(authorEmail)) {
        alert("Please enter valid book details.");
        return;
    } else {
        if (!bookNameCheck(bookName)) {
            alert("Please enter a valid book name.");
            return;
        }
        if (!priceCheck(bookPrice)) {
            alert("Please enter a valid book price.");
            return;
        }
        if (!authorNameCheck(authorName)) {
            alert("Please enter a valid author name.");
            return;
        }
        if (!emailCheck(authorEmail)) {
            alert("Please enter a valid author email.");
            return;
        }
    }

    alert("Book added successfully!");
    let author = new Author(authorName, authorEmail);
    let book = new Book(bookName, bookPrice, author);
    books.push(book);
    bookCount++;

    if (bookCount >= totalBooks) {
        document.getElementById("bookForm").style.display = "none";
        document.getElementById("bookTable").style.display = "block";
    }
    renderTable();
    clearInputs();
}

function clearInputs() {
    document.getElementById("bookName").value = "";
    document.getElementById("bookPrice").value = "";
    document.getElementById("authorName").value = "";
    document.getElementById("authorEmail").value = "";
}

function renderTable() {
    let tableBody = document.getElementById("bookTableBody");
    tableBody.innerHTML = "";
    books.forEach((book, index) => {
        let row = `<tr>
            <td contenteditable="false">${book.name}</td>
            <td contenteditable="false">${book.price}</td>
            <td contenteditable="false">${book.author.name}</td>
            <td contenteditable="false">${book.author.email}</td>
            <td>
                <button id="btn" onclick="editBook(${index}, this)">Edit</button>
                <button onclick="deleteBook(${index})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function editBook(index, button) {
    let row = button.closest("tr");
    let cells = row.querySelectorAll("td[contenteditable]");
    let isEditing = row.classList.toggle("editing");
    
    if (isEditing) {
        button.textContent = "Save";
        cells.forEach(cell => cell.contentEditable = "true");
    } else {
        let bookName = cells[0].textContent;
        let bookPrice = cells[1].textContent;
        let authorName = cells[2].textContent;
        let authorEmail = cells[3].textContent;

        if (!bookNameCheck(bookName)) {
            alert("Please enter a valid book name.");
            return;
        }
        if (!priceCheck(bookPrice)) {
            alert("Please enter a valid book price.");
            return;
        }
        if (!authorNameCheck(authorName)) {
            alert("Please enter a valid author name.");
            return;
        }
        if (!emailCheck(authorEmail)) {
            alert("Please enter a valid author email.");
            return;
        }

        button.textContent = "Edit";
        cells.forEach(cell => cell.contentEditable = "false");
        books[index].name = bookName;
        books[index].price = bookPrice;
        books[index].author.name = authorName;
        books[index].author.email = authorEmail;
    }
}

function deleteBook(index) {
    books.splice(index, 1);
    renderTable();
    if (books.length === 0) {
        document.getElementById("bookTable").style.display = "none";
    }
}