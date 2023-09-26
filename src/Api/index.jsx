import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://www.jogjatripplanner.cloud/'
})

export default Api