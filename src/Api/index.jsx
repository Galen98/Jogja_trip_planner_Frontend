import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://203.194.113.182'
})

export default Api