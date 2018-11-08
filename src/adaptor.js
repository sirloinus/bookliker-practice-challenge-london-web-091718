// BOOKS 
const getBooks = async url => {
    const response = await fetch(url)
    return response.json()
}

const addBook = async book => {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    return resp.json()
}

const editBook = async (url, book) => {
    const resp = await fetch(url + `/${book.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)       
    })
    return resp.json()
}


// USERS 
const getUsers = async url => {
    const response = await fetch(url)
    return response.json()
}

const getUser = async url => {
    const response = await fetch(url)
    return response.json()
}


