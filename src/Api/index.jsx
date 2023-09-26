import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://jogjatripplanner.cloud/'
})

export default Api