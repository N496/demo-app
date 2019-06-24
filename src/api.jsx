import axios from "axios";

export default {
    user: {
        login: (credentials) => axios.post('http://localhost:3000/api/v1/users/sign_in', {user: credentials}).then(res => res.data),
        signup: (credentials) => axios.post('http://localhost:3000/api/v1/users', {user: credentials}).then(res => res.data)
    }
}