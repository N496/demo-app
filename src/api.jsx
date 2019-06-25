import axios from "axios";

export default {
    user: {
        login: (credentials) => axios.post('http://localhost:3000/api/v1/users/sign_in', {user: credentials}).then(res => res.data),
        signup: (credentials) => axios.post('http://localhost:3000/api/v1/users', {user: credentials}).then(res => res.data),
        confirm: (token) => axios.post('http://localhost:3000/api/v1/users/confirmation', {confirmation_token: token}).then(res =>res.data)
    },
    books: {
        fetchAll: () => axios.get(`http://localhost:3000/api/v1/books?auth_token=${localStorage.ecommerceJWT}`).then(res =>res.data.books),
        create: (book) => axios.post('http://localhost:3000/api/v1/books', { auth_token: localStorage.ecommerceJWT, book: book}).then(res =>res.data.book),
    }
}