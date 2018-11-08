const booksURL = 'http://localhost:3000/books'
const usersURL = 'http://localhost:3000/users'
const listEl = document.querySelector('#list')
const bookContainer = document.querySelector('#show-panel')

const state = {
    books: [],
    user: {
        "id": 1,
        "username": "pouros"
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const books = await getBooks(booksURL)
    state.books = books
    renderBookCollectionList(books)
})

document.addEventListener('click', event => {
    if (event.target.className === 'book-title') {
        event.preventDefault()
        const bookId = event.target.dataset.id
        const foundBook = state.books.find(book => book.id === parseInt(bookId))
        bookContainer.innerHTML = ''
        showBook(foundBook)
    }
    if (event.target.className === 'read-button') {
        event.preventDefault()
        const bookId = event.target.dataset.id
        const foundBook = state.books.find(book => book.id === parseInt(bookId))
        userReadBook(foundBook)
    }
})

const userReadBook = async book => {
    if (book.users.find(user => user.id === state.user.id)) {
        book.users.splice(book.users.findIndex(el => el.id === state.user.id), 1)
        const editedBook = await editBook(booksURL, book)
        showBook(editedBook)
        return
    }
    book.users.push(state.user)
    const editedBook = await editBook(booksURL, book)
    showBook(editedBook)
}

const renderBookToList = book => {
    const bookTitleEl = document.createElement('li')
    // bookEl.classList.add('book-list')
    bookTitleEl.innerHTML = `
        <p data-id=${book.id} class="book-title">${book.title}</p>
    `
    listEl.appendChild(bookTitleEl)
}

const renderBookCollectionList = books => {
    books.forEach(book => renderBookToList(book))
}

const showBook = book => {
    bookContainer.innerHTML = `
        <div class='show-book'>
            <h3>${book.title}</h3>
            <img src=${book.img_url}>
            <p>${book.description}</p>
            <button data-id=${book.id} class='read-button'>Read Book</button>
            <br>
            <ul>${renderBookReaders(book)}</ul>
        </div>
    `
}

const renderBookReaders = book => {
    return string = book.users.map(user => `<li>${user.username}</li>`).join(" ")
}
