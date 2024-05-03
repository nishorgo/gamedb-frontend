import axios from "axios";

export interface FetchResponse<T> {
    count: number;
    results: T[];
}

export default axios.create({
    baseURL: 'https://api.rawg.io/api/',
    params: {
        key: 'dfade1eeedfe48faa83e141e9a9ae60b'
    }
})