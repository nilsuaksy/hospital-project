import axios from "axios";

const baseClient = axios.create({
    baseURL: 'http://localhost:5001/'
});

export { baseClient };