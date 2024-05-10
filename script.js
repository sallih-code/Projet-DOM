const bookList = document.getElementById('book-list');
const addBookBtn = document.getElementById('add-book-btn');
const modal = document.getElementById('modal');
const saveBookBtn = document.getElementById('save-book-btn');

function renderBooks(books) {
    bookList.innerHTML = '';
    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.innerHTML = `
            <span>ID: ${book.id}</span>
            <span>Title: ${book.title}</span>
            <span>Author: ${book.author}</span>
            <button class="mark-read-btn">Mark as Read</button>
            <button class="delete-btn">Delete</button>
        `;
        if (book.read) {
            bookItem.classList.add('read');
        }
        bookList.appendChild(bookItem);

        const markReadBtn = bookItem.querySelector('.mark-read-btn');
        markReadBtn.addEventListener('click', () => markAsRead(book.id));
        const deleteBtn = bookItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteBook(book.id));
    });
}

function addBook(title, author) {
    const newBook = {
        id: Date.now(), 
        title,
        author,
        read: false 
    };
    books.push(newBook);
    renderBooks(books);
    localStorage.setItem('books', JSON.stringify(books));
}

function markAsRead(bookId) {
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        books[bookIndex].read = true;
        renderBooks(books);
        localStorage.setItem('books', JSON.stringify(books));
    }
}

function deleteBook(bookId) {
    books = books.filter(book => book.id !== bookId);
    renderBooks(books);
    localStorage.setItem('books', JSON.stringify(books));
}

function initApp() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
        renderBooks(books);
    }
}

addBookBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

saveBookBtn.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    addBook(title, author);
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        modal.style.display = 'none';
    }
});

let books = [];
initApp();

