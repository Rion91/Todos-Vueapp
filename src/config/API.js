import axios from "axios";

export default axios.create({
    baseURL: 'http://todos_api.test/api',
    headers:{
        Authorization: 'Bearer ' + window.localStorage.getItem('jwtToken')
    }
})
